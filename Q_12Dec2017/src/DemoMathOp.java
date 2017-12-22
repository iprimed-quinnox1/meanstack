import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

import ops.MathOp;
import ops.SquareOp;
import ops.geo.AreaOfCircleOp;

public class DemoMathOp {

	private static List<MathOp> supportedOps = new ArrayList<MathOp>();
	static {
		supportedOps.add(new SquareOp());
		//supportedOps.add(new CubeOp());
		//supportedOps.add(new AddOp());
		//supportedOps.add(new SubtractOp());
		//supportedOps.add(new MultiplyOp());
		//supportedOps.add(new DivideOp());
		supportedOps.add(new AreaOfCircleOp());
	}

	public static void main(String[] args) {
		do {
			int choice = getOpChoice();
			MathOp op = getMathOp(choice);
			if (op != null) {
				op.getInputs();
				op.operate();
				op.displayResult();
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
