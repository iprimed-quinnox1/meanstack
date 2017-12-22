package keywords;

public class DemoKeywords {

	public static void main(String[] args) {
		CLS c1 = new CLS();
		CLS c2 = new CLS();
		
		System.out.println(c1.myType);
		System.out.println(c2.myType);
		System.out.println(c1.localName);
		System.out.println(c2.localName);
		c1.localName = "C1";
		c2.localName = "C2";

		//c2.myType = "Modified";

		System.out.println(CLS.myType);
		System.out.println(CLS.myType);
		System.out.println(c1.localName);
		System.out.println(c2.localName);
}
	
}

class CLS{
	final static String myType;
	
	String localName = "";
	
	static {
		myType = "CLS";
	}
}