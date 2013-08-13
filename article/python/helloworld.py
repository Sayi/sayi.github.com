import sys
import fibo
from PyQt4 import QtGui, QtCore, uic

class Test():
    """a test class demo"""
    def __init__(self, name):
        self.name = name        

def A ():
    return "helloworld"

if __name__ == '__main__' :
    print(A())
    fibo.fib(5)
    print(sys.version)
    t = Test("ada")
    print(t.name)
























#raw_input("press <enter>")

