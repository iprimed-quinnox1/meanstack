package com.jrs.training.java.logging;

import java.io.FileInputStream;
import java.io.IOException;
import java.util.Properties;
import java.util.logging.FileHandler;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.logging.SimpleFormatter;

public class MyLogger {
	public static Logger LG;
	static{
		new MyLogger().setup();
	}
	
	Properties loggerProps = new Properties();
	
	private void setup(){

		try {
			loggerProps.load(new FileInputStream("log-level.properties"));
		} catch (IOException e) {
		}
		createLogger();
		configureLogLevel();
		configureFileHanlder();
	
	}

	private void createLogger() {
		LG  = Logger.getLogger("MyLogger");
		//LogManager.getLogManager().addLogger(LG);
	}
	
	void configureFileHanlder() {
		try {
			String loggerFile = "mylogger.txt";
			if(loggerProps.get("logger.file") != null){
				loggerFile = (String)loggerProps.get("logger.file");
			}
			FileHandler fh = new FileHandler(loggerFile);
			fh.setFormatter(new SimpleFormatter());
			LG.addHandler(fh);
		} catch (SecurityException |IOException e) {
			e.printStackTrace();
		}
	}
	
	private void configureLogLevel() {
		try {
			Level level = Level.OFF;
			if(loggerProps.get("logger.level") != null){
				int levelPropVal = Integer.parseInt((String)loggerProps.get("logger.level"));
				switch (levelPropVal) {
				case -1:
					level = Level.OFF;
					break;
				case 0:
					level = Level.SEVERE;
					break;
				case 1:
					level = Level.WARNING;
					break;
				case 2:
					level = Level.INFO;
					break;
				case 3:
					level = Level.CONFIG;
					break;
				case 4:
					level = Level.FINE;
					break;
				case 5:
					level = Level.FINER;
					break;
				case 6:
					level = Level.FINEST;
					break;
				case 7:
					level = Level.ALL;
					break;

				default:
					level = Level.OFF;
					break;
				}
				LG.setLevel(level);
			}
		} catch (Exception e1) {
		}
	}

}
