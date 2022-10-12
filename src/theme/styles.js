import { mode } from '@chakra-ui/theme-tools';

export const globalStyles = {
	colors: {
		transparent: "transparent",
		black: "#000",
		white: "#fff",
		gray: {
		  50: "#f7fafc",
		  // ...
		  900: "#171923",
		},
		// ...
	},
	styles: {
		global: (props) => ({
			body: {
				bg: mode('gray.50', 'gray.800')(props),
				fontFamily: "'Roboto', sans-serif"
			},
			html: {
				fontFamily: "'Roboto', sans-serif"
			}
		})
	}
};
