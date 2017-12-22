package in.jrsonline.basic;

public class PrimeFactors {
	static int[] primes = {2, 3, 5, 7, 11, 13, 17, 19, 23,};

	public static void main(String[] args) {
		int num = 400888088;
		System.out.print(Messages.getString("pf.0") + num + Messages.getString("pf.1")); //$NON-NLS-1$ //$NON-NLS-2$
		while (num != 1){
			int i =0;
			for(i=0; i< primes.length; i++){
				int p = primes[i];
				if(num % p == 0){
					System.out.print(p + Messages.getString("pf.2")); //$NON-NLS-1$
					num = num/ p;
					break;
				}
			}
			if(i == primes.length){
				System.out.println(num);
				break;
			}
		}
	}

}
