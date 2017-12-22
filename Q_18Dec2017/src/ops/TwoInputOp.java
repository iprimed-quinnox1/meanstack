package ops;
public abstract class TwoInputOp extends MathOp {

	@Override
	public void getInputs() {
		noOfInputs = 2;
		super.getInputs();
	}

}
