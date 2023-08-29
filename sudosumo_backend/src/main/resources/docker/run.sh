#!/bin/bash
#Debug inside docker container
if [ "$APP_DEBUG_ENABLE" = true ]; then
    JAVA_OPTS="$JAVA_OPTS -agentlib:jdwp=transport=dt_socket,server=y,suspend=n,address=*:$APP_DEBUG_PORT"
fi
sleep 10
echo "JAVA_OPTS=$JAVA_OPTS"
java $JAVA_OPTS -jar /opt/$APPLICATION/app.jar $APP_ARGS
EOF