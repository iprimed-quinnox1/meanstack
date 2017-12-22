package io;

import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Locale;
import java.util.Properties;
import java.util.Scanner;

import ops.MathOp;

public class DemoMathOpViaIO {

	private static List<MathOp> supportedOps = new ArrayList<MathOp>();

	private static void loadOps() {
		BufferedReader bf = null;
		try{
			bf = new BufferedReader(new FileReader("ops.txt"));
			String line = null;
			while((line = bf.readLine()) != null){
				String opClsFQCN = line.trim();
				Class opCls = Class.forName(opClsFQCN);
				supportedOps.add((MathOp)opCls.newInstance());
			}
		}catch (Exception e) {
			e.printStackTrace();
		} finally {
			if(bf != null){
				try {
					bf.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

	private static void saveResult(String result) {
		BufferedWriter bf = null;
		try{
			bf = new BufferedWriter(new FileWriter("result.txt", true));
			bf.write(result);
			bf.write("\r\n");
		}catch (Exception e) {
			e.printStackTrace();
		} finally {
			if(bf != null){
				try {
					bf.close();
				} catch (IOException e) {
					e.printStackTrace();
				}
			}
		}
	}

	public static void main(String[] args) {
		/*
		System.setProperty("user.language", "hi");
		Properties props = System.getProperties();
		for(Object key: props.keySet()){
			System.out.print(key);
			System.out.print(":");
			System.out.println(props.get(key));
		}
		*/
		Locale.setDefault(new Locale("hi"));
		loadOps();
		
		do {
			int choice = getOpChoice();
			MathOp op = getMathOp(choice);
			if (op != null) {
				op.getInputs();
				op.operate();
				String result = op.displayResult();
				saveResult(result);
			}
		} while (true);
	}

	private static MathOp getMathOp(int choice) {
		MathOp op = null;
		if (supportedOps.size() >= choice) {
			op = supportedOps.get(choice - 1);
		}
		return op;
	}

	private static int getOpChoice() {
		String options = "\nOptions";
		for (int i = 0; i < supportedOps.size(); i++) {
			options += "\n" + (i + 1) + " " + supportedOps.get(i).getType();
		}
		options += "\n\t" + (supportedOps.size() + 1) + " Exit";

		System.out.println(options);
		int choice = Integer.MAX_VALUE;

		Scanner sc = new Scanner(System.in);
		String input = sc.nextLine();
		choice = Integer.MAX_VALUE;
		try {
			choice = Integer.parseInt(input);
			if (choice == (supportedOps.size() + 1)) { // EXIT choosen
				System.out.println("Thank you.");
				System.exit(0);
			}
		} catch (NumberFormatException e) {
			System.out.println("Invalid input. Retry.");
		}
		return choice;
	}

}
