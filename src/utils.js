export const getFormatString = () => {
	const browserLocale = navigator.language;
	const options = { year: "numeric", month: "numeric", day: "numeric" };
	const formatter = new Intl.DateTimeFormat(browserLocale, options);
	const formatParts = formatter.formatToParts();

	const formatString = formatParts
		.map((part) => {
			switch (part.type) {
				case "year":
					return "YYYY";
				case "month":
					return "MM";
				case "day":
					return "DD";
				default:
					return part.value;
			}
		})
		.join("");

	return formatString;
};
