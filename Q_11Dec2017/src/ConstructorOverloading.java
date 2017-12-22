
public class ConstructorOverloading {

	public static void main(String[] args) {
		System.out.println(new Student());
		System.out.println(new Student("1", "Abhishek Patil"));
		System.out.println(new Student("2", "Akshatha A S", "Quinnox", 22, 100));
	}
}

class Student{
	static int objCnt = 0;
	
	String enrolment;
	String name;
	String branch;
	int age;
	int marks;
	
	public Student() {
		objCnt++;
	}
	
	public Student(String enrolment, String name){
		this();

		this.enrolment = enrolment;
		this.name = name;
	}

	public Student(String enrolment, String name, String branch,int age, int marks){
		this(enrolment, name);

		this.branch = branch;
		this.age = age;
		this.marks = marks;
	}
	
	@Override
	public String toString() {
		return 	"\tObject # - " + objCnt
				+ "\tEnrolment - " + enrolment 
				+ "\tName - " + name
				+ "\tBranch - " + branch
				+ "\tAge - " + age
				+ "\tMarks - " + marks
				;
	}

}