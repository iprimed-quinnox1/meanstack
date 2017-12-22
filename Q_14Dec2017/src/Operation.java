

public interface Operation<I, O> {

	public void setInput(I obj);
	public void operate();
	public O displayResult();
}
