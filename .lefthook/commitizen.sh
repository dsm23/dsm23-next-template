# Only run commitizen if no commit message was already provided.
if [ -z "${2-}" ]; then
  exec < /dev/tty && ./node_modules/.bin/cz --hook || true
fi
