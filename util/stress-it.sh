#!/bin/sh

# Launch several clients with different timings to stress test the API

BASEDIR=$(dirname "$0")

node ${BASEDIR}/random-message-poster.mjs 30 100 &
node ${BASEDIR}/random-message-poster.mjs 20 200 &
node ${BASEDIR}/random-message-poster.mjs 10 300 &

