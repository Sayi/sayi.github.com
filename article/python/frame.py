import sys
from PyQt4 import  QtCore, QtGui

class MyWindow( QtGui.QMainWindow ):
    def __init__( self ):
        QtGui.QMainWindow.__init__( self )
        self.setWindowTitle( "PyQt" )
        self.resize( 300, 200 )

app = QtGui.QApplication( sys.argv )
mywindow = MyWindow()
mywindow.show()
app.exec_()