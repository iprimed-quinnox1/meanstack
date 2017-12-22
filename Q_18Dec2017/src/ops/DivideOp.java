package ops;

public class DivideOp extends TwoInputOp {

	@Override
	public void operate() {
		if(numbers.size() == 2 && numbers.get(1).doubleValue() != 0){
			result = numbers.get(0).doubleValue()/numbers.get(1).doubleValue();
		}

	}

	@Override
	public String getType() {
		return "DIVISION";
	}

}
