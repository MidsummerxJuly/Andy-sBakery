import Link from 'next/link';
import BottomSheetNav from "./components/BottomSheetNav";




export default function Home() {
	return (
		<div className='antialiased' suppressHydrationWarning>
			<div className="body-wrap boxed-container">

				<main>
					<section className="hero text-center text-light">
						<div className="hero-copy">
						<h1 className="hero-title mt-0 brand" style={{ paddingBottom: "1rem" }}>Andy's Bakery</h1>
					<p className="hero-paragraph">Fresh baked sweets, custom cakes, and homemade treats.</p>
					<div className="hero-cta">
						<Link className="button button-primary button-wide-mobile" href="/services">START AN ORDER</Link>
					</div>
						</div>
					</section>

				</main>


			</div>

			<BottomSheetNav />
		</div>
	);
}
