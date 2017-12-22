package ops;

public class AddOp extends MathOp {

	@Override
	public void operate() {
		boolean first = true;
		for(Number num: numbers){
			if(first){
				result = num.doubleValue();
				first = false;
			} else {
				result = result.doubleValue() + num.doubleValue();
			}
		}
	}

	@Override
	public String getType() {
		return "ADDITION";
	}

}
