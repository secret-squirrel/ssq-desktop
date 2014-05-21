#! /usr/bin/env bash
set -e

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

"${DIR}/build/atom-shell/Atom.app/Contents/MacOS/Atom" "${DIR}/ssq-app" 
