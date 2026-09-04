---
title: 'Migrar de la SD a un SSD'
slug: 'ssd-migration'
description: 'Migrar la Raspberry Pi de una tarjeta SD a un SSD externo: clonación, UUIDs, arranque y el misterioso SSH que dejó de funcionar.'
tags: [raspberrypi, ssd, devops]
publicationDate: 2026-09-04
permalink: /posts/ssd-migration/
layout: base.liquid
---

# Contexto

Llevaba tiempo queriendo sacar la Raspberry Pi de la tarjeta SD y pasarla a un SSD externo. La SD no era mas opción mas sostenible: es lenta, se degrada con el tiempo y solo tiene 64 gigas. Así que perplexity me dijo que el cambio era sencillamente clonar el sistema entero a un SSD y dejar que arrancara desde ahí, cosa con la que estuve 5 horas.

## El plan inicial: clonar y listo

La idea era clonar la SD al SSD con `dd`, ajustar un par de cosas y ya tendría un Raspberry Pi arrancando desde el SSD, más rápido y más fiable. En la práctica, `dd` hace exactamente lo que promete: copia todo bit a bit, incluidas las partes que no quieres que sean idénticas, como los UUID de las particiones. Eso significa que, tras el clonado, la SD y el SSD tenían el mismo UUID en su partición raíz y el mismo label en el boot. Para el kernel, ambos discos eran indistinguibles, así que no había garantía de cuál elegiría al arrancar.

## Forzando el arranque desde el SSD

La solución fue generar un UUID nuevo para la partición raíz del SSD con `tune2fs` y luego editar el `cmdline.txt` de su partición de boot para que apuntara explícitamente a ese UUID en lugar de depender del label genérico `writable` que comparten ambos discos. Con eso, ya no había ambigüedad: el kernel monta como raíz el disco que yo le diga, no el que encuentre primero. Tras el cambio, `df -h /` confirmó que el sistema ya vivía en `/dev/sda2`, el SSD. Primer objetivo cumplido.

## El SSH que se negaba a arrancar

Con el sistema ya corriendo desde el SSD, el servicio SSH dejó de arrancar solo en el boot. A veces ni siquiera lo dejaba iniciar a mano, _"Job for ssh.service canceled"_ que no explicaba nada. Reinstalé el paquete, revisé los sockets de systemd, hasta que até cabos: esto empezó justo después de mover la raíz al SSD.

La pista definitiva estaba en `/etc/fstab`. Ahí había una línea antigua que montaba una partición llamada `/mnt/immich` (el disco SSD externo que usaba que ahora en el raíz) sin la opción `nofail`. Cuando un `fstab` intenta montar algo que no está disponible y no lleva `nofail`, systemd se queda esperando ese punto de montaje hasta 90 segundos antes de continuar el arranque. Ese retraso empujaba a `ssh.service` fuera de su ventana normal de arranque, y el sistema lo cancelaba.

La solución fue simplemente borrar esa línea de `fstab` (ya que el disco de Immich ya no existe) y, de paso, sustituir los labels ambiguos (`LABEL=writable`, `LABEL=system-boot`) por los UUID reales del SSD, para evitar que se repitiera el lío de discos indistinguibles. Tras reiniciar, el arranque fue mucho más rápido y SSH volvió a activarse sin problemas.
