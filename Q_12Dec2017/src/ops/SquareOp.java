package ops;

public class SquareOp extends MathOp {

	@Override
	public void getInputs() {
		noOfInputs = 1;
		super.getInputs();
	}
	
	@Override
	public void operate() {
		if(numbers.size() == 1){
			result = numbers.get(0).doubleValue() * numbers.get(0).doubleValue();
		}
	}

	@Override
	public String getType() {
		return "SQUARE";
	}

	@Override
	public String displayResult() {
		String rs = "Op Type - " + getType() + " :: Number - " + numbers + " :: Result: " + result;
		System.out.println(rs);
		return rs;
	}
}
