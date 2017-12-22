package date;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;

public class DemoDateTime {

	public static void main(String[] args) {
		System.out.println(System.currentTimeMillis());
		Date dt = new Date();
		System.out.println(dt);
		DateFormat sdf = new SimpleDateFormat("w dd-M-YY");
		System.out.println(sdf.format(dt));
		
		LocalDate ld = LocalDate.now();
		System.out.println(ld);
		
		LocalDateTime ldt = LocalDateTime.now();
		System.out.println(ldt);
	}

}
