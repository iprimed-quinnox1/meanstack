import ops.MathOp;

public class DemoGenerics {

	public static void main(String[] args) {
		Operation<Number, String> op = new OperationImpl<>();
		op.setInput(0);
		Operation<String, MathOp> op1 = new OperationImpl<>();
		MathOp mop = op1.displayResult();
	}

}
