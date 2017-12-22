package ops.geo;

import ops.MathOp;

public class AreaOfCircleOp extends MathOp {
	@Override
	public void getInputs() {
		noOfInputs = 1;
		super.getInputs();
	}
	@Override
	public void operate() {
		result = Math.PI*numbers.get(0).doubleValue()*numbers.get(0).doubleValue();
	}

	@Override
	public String getType() {
		return "AREA of a CIRCLE";
	}

	@Override
	public String displayResult() {
		String rs = getType() + " :: radius - " + numbers.get(0) + " :: area - " + result;
		System.out.println(rs);
		return rs;
	}
}
