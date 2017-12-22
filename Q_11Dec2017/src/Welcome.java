import java.util.Scanner;

public class Welcome {

	public static void main(String[] args) {
		System.out.println("Welcome " + args[0]);
		System.out.println("Your adrress please: ");
		Scanner sc = new Scanner(System.in);
		String ad = sc.nextLine();
		System.out.println("Address: \n" + ad);
		
	}

}
