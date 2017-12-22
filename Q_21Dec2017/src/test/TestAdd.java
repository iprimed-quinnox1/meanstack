package test;
import org.junit.Assert;
import org.junit.Test;

import com.jrs.src.ArithMath;

public class TestAdd {

	@Test
	public void testAddOfTwoPositiveIntegers(){
		int i1 = 2;
		int i2 = 3;
		int expected = 5;
		
		Assert.assertEquals(expected, new ArithMath().add(i1, i2));
	}
	
	@Test
	public void testAddOfTwoNegativeIntegers(){
		int i1 = -2;
		int i2 = -3;
		int expected = -5;
		
		Assert.assertEquals(expected, new ArithMath().add(i1, i2));
	}

	/*
	@Test
	public void testAddTwoStrings(){
		Object i1 = "1";
		Object i2 = "2";
		int expected = -5;
		
		Assert.assertEquals(expected, new ArithMath().add(i1, i2));
	}
	*/
	
	
	@Test
	public void testAddOfTwoFloats(){
		float i1 = 2.2f;
		float i2 = -3.9f;
		float expected = -1.7f;
		
		Assert.assertEquals(expected, new ArithMath().add(i1, i2));
	}


}
