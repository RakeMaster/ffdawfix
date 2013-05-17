ru.dclan.ffdawfix.replacers.maze = function( f ) {
	if( !f.checkLocation( "/vr/places/MazeView.aspx" ) ) return;
	f.addReplace(/btExitMaze\"/, '$& onclick="if(!confirm(this.title+\'?\')) return false;"');
}
