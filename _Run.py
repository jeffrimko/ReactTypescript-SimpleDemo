# -*- ubuild -*-

##==============================================================#
## SECTION: Imports                                             #
##==============================================================#

import os.path as op
import time
import webbrowser

from auxly.filesys import Cwd
from auxly.shell import start, silent
from qprompt import alert, warn, status
from ubuild import main, menu

##==============================================================#
## SECTION: Global Definitions                                  #
##==============================================================#

PROCS = []

##==============================================================#
## SECTION: Function Definitions                                #
##==============================================================#

def is_running():
    global PROCS
    return PROCS != []

@menu
def run():
    global PROCS
    if is_running():
        warn("App server already running!")
        return
    with Cwd("app"):
        if not op.isdir("node_modules"):
            status("Running NPM install...", silent, ["npm install"])
        PROCS.append(start("npm run start"))
        alert("Application starting...")
        time.sleep(3)
        if all(map(lambda p: p.isrunning(), PROCS)):
            alert("Application started.")
        else:
            warn("Issue starting application!")
            stop()

@menu
def check():
    if is_running():
        alert("Application is running!")
    else:
        alert("Application not running!")

@menu
def browse():
    if not is_running():
        warn("Application not running!")
        return
    webbrowser.open("http://localhost:8080/")

@menu
def stop():
    global PROCS
    if not is_running():
        warn("Application not running!")
        return
    for p in PROCS:
        p.stop()
    PROCS = []
    alert("Application stopped.")

##==============================================================#
## SECTION: Main Body                                           #
##==============================================================#

if __name__ == '__main__':
    main(default="r")
