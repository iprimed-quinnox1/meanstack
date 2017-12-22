package ops;

public class CubeOp extends SquareOp {

	@Override
	public void operate() {
		if(numbers.size() == 1){
			result = numbers.get(0).doubleValue() 
					* numbers.get(0).doubleValue()
					* numbers.get(0).doubleValue();
		}
	}

	@Override
	public String getType() {
		return "CUBE";
	}

}
