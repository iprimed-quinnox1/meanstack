
public class ConstructorChain {

	public static void main(String[] args) {
		new Fourth();
		//new Fourth("Parametrized Fourth");
	}

}

class First{
	public First() {
		System.out.println("I am class 'First'");
	}
}

class Second extends First {
	public Second() {
		System.out.println("I am class 'Second'");
	}
	public Second(String name) {
		System.out.println("I am class " + name);
	}
}

class Third extends Second {
	public Third() {
		System.out.println("I am class 'Third'");
	}

}

class Fourth extends Third {
	public Fourth() {
		System.out.println("I am class 'Fourth'");
	}
	
	public Fourth(String name) {
		//super(name + " in parent");
		System.out.println("I am class " + name);
	}
}