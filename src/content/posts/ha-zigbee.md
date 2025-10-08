---
title: 'Despliegue de Home Assistant con Zigbee'
slug: 'homeassistant-zigbee-homelab'
description: 'Puesta en marcha de un nodo con el sistema operativo Home Assistant y la configuración de Zigbee para dispositivos IoT.'
publicationDate: 2025-10-07
tags: [homelab, iot]
public: true
author: 'Ismael Illán García'
---

# Contexto

Tengo unos cuantos sensores **Zigbee** por la casa, pero lo más relevante es que necesitaba automatizar la luz de un acuario que estoy montando con mi compañero de piso. Estar enchufando y apagando la luz todos los días es algo que se acaba olvidando y que es fácilmente automatizable con un enchufe inteligente.

Como ya tenía algunos sensores, aproveché para comprar también un enchufe Zigbee, y así me obligaba a volver a montar la instalación de **Home Assistant** que tenía hace un tiempo, pero que acabé descartando.
Al final compré el más barato que encontré de oferta por chochiexpress por tres euros.

Ya tenía parte de la instalación de la vez anterior, pero también se necesita una antena o adaptador para la red Zigbee; al final es como usar el típico pincho USB para el Wi-Fi.

<div style="display: flex; justify-content: center; gap: 10px;">
    <img src="/assets/cluster.jpeg" alt="Antena Zigbee USB" style="width: 45%; border-radius: 10px;"> 
</div>

# Configuración

En principio quería instalar el sistema operativo de Home Assistant en la **Orange Pi Zero 3** que tengo puesta ahí en el rack, pero que ahora mismo está muerta de asco.
Después de intentar instalarle ocho sistemas operativos diferentes, además del de Home Assistant, me rendí. Lo volveré a probar tranquilamente en el futuro, porque tampoco quiero tener que tirarla.

Esto me dejaba con dos opciones: o instalar el sistema operativo en una de las Raspberry del clúster de Kubernetes —y por lo tanto perderla—, o desplegar Home Assistant con **Docker**.
Había leído que esta última opción era mucho más complicada, ya que tienes que montar tú mismo los servicios de Mosquitto y Zigbee2MQTT, en lugar de simplemente pulsar un botón en el panel de control de Home Assistant.

En la práctica, resulta ser una tontería de **docker-compose** que se levanta sin mucho problema.
Más tarde, desde el panel de Home Assistant, solo hay que indicar la IP y el puerto del servidor MQTT de Mosquitto y listo: ya puedes empezar a emparejar dispositivos.

Una vez con el pincho Zigbee y el enchufe añadidos, ya puedo automatizar la luz, que al final consiste simplemente en encender al amanecer y apagar al anochecer.

<div style="display: flex; justify-content: center; gap: 10px;">
    <img src="/assets/acuario.jpeg" alt="Antena Zigbee USB" style="width: 80%; border-radius: 10px;"> 
</div>
