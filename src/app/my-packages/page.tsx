import PackageCardList from "@/components/my-packages/PackageCardList";

export default function MyPackages() {
	return (
		<section className="mx-auto max-w-5xl p-4">
			<h1 className="mb-8 text-3xl font-bold">My Packages</h1>
			<PackageCardList />
		</section>
	);
}
