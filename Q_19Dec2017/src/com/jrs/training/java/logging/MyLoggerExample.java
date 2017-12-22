package com.jrs.training.java.logging;

import java.util.logging.Logger;

public class MyLoggerExample {
	static Logger lg = MyLogger.LG;
	
	public static void main(String[] args) {
		lg.info("Inside main method");
		logMessages();
		lg.info("Exiting main method");
	}

	static void logMessages(){
		lg.finest("Beginning to create logs");
		String info ="Info Message";
		System.out.println(info);
		lg.info(info);
		
		lg.severe("A Severe situation");
	}
}
