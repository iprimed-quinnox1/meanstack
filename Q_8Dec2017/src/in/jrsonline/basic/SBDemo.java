package in.jrsonline.basic;

public class SBDemo {

	public static void main(String[] args) {
		String a = args[0]; //abc
		String b = args[1]; //xyz
		System.out.println(a  + ", " + b);
		a = a+b; //abcxyz
		b = a.replace(b, new String());//abc
		a = a.replace(b, new String());//xyz
		System.out.println(a  + ", " + b);
	}

}
