package ops;

public class SubtractOp extends TwoInputOp {

	@Override
	public void operate() {
		if(numbers.size() == 2){
			result = numbers.get(0).doubleValue() - numbers.get(1).doubleValue();
		}
	}

	@Override
	public String getType() {
		return "SUBTRACTION";
	}

}
