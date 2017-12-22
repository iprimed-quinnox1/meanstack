import java.util.Iterator;

public class ForEach {

	public static void main(String[] args) {
		MyIterable mi = new MyIterable();
		
		for(String s: mi){
			
		}
	}
};

class MyIterable implements Iterable<String>{

	@Override
	public Iterator<String> iterator() {
		// TODO Auto-generated method stub
		return null;
	}
	
}
