import java.util.Scanner;

public class Calculator {

	public static void main(String[] args) {

		boolean toExit = false;
		do {
			String options = "\n\nOptions" + "\n1. Addition" + "\n2. Subtraction" + "\n3. Multiplication"
					+ "\n4. Division" + "\n5. Exit";

			System.out.println(options);

			Scanner sc = new Scanner(System.in);
			int choice = sc.nextInt();
			int n1 = 0, n2 = 0;
			switch (choice) {
			case 1:
				System.out.println("Enter two numbers: \n");
				n1 = sc.nextInt();
				n2 = sc.nextInt();
				System.out.printf("\nAddition of %d and %d is %d.", n1, n2, (n1 + n2));
				break;
			case 2:
				System.out.println("Enter two numbers: \n");
				n1 = sc.nextInt();
				n2 = sc.nextInt();
				System.out.printf("\nSubstraction of %d and %d is %d.", n1, n2, (n1 - n2));
				break;
			case 3:
				System.out.println("Enter two numbers: \n");
				n1 = sc.nextInt();
				n2 = sc.nextInt();
				System.out.printf("\nMultiple of %d and %d is %d.", n1, n2, (n1 * n2));
				break;
			case 4:
				System.out.println("Enter two numbers: \n");
				n1 = sc.nextInt();
				n2 = sc.nextInt();
				System.out.printf("\nDivision of %d and %d is %d.", n1, n2, (n1 / n2));
				break;
			case 5:
				toExit = true;
				break;

			}
		} while (!toExit);
		
		System.out.println("Thank you!");
	}

}
