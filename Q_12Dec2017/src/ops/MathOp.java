package ops;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public abstract class MathOp {

	protected int noOfInputs = Integer.MAX_VALUE;
	protected List<Number> numbers = new ArrayList<Number>();
	protected Number result = 0;
	
	public void getInputs() {
		Scanner sc = new Scanner(System.in);
		while(true){
			String input = null;
			try {
				System.out.print("\nEnter a Number (press only ENTER to indicate no more inputs) - ");
				input = sc.nextLine();
				if(input != null && input.trim().isEmpty()){
					break;
				}
				numbers.add(Double.parseDouble(input));
				if(numbers.size() >= noOfInputs){
					break;
				}
			} catch (Exception e) {
				System.out.println(input + " in invalid input. Try again");
			}
		}
		//sc.close();
	}
	
	public abstract void operate();
	
	public abstract String getType();
	
	public String displayResult(){
		String resultString = getType() 
				+ ": "
				+ numbers 
				+ " : RESULT = "
				+ result
				;
		System.out.println(resultString);
		
		return resultString;
	}
	
}
