package logger;

import java.util.logging.Level;
import java.util.logging.Logger;

public class LoggerEx {

	public static void main(String[] args) {
		Logger lg = Logger.getLogger("");
		//lg.setLevel(Level.ALL);
		//lg.addHandler(new ConsoleHandler());
		lg.log(Level.SEVERE, "Welcome to Logger");
	}

}
