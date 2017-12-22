package ops.geo;

import java.text.MessageFormat;

import i18n.Messages;
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
		return Messages.getString("AreaOfCircleOp.type"); //$NON-NLS-1$
	}

	@Override
	public String displayResult() {
		String rs = MessageFormat.format(Messages.getString("AreaOfCircleOp.radius_area"), getType(), numbers.get(0), result); 
		System.out.println(rs);
		return rs;
	}
}
