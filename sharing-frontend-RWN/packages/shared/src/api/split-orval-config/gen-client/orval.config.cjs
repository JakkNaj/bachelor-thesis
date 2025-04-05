// Function to get Orval configuration with customizable paths
function getOrvalConfig({ 
	outputPath = './generated', 
	schemasPath = './generated/schemas',
	mutatorPath = './mutator/custom-instance.ts'
} = {}) {
	return {
		tripPlanner: {
			input: {
				target: "../../packages/shared/src/api/openapi.json",
				validation: false,
			},
			output: {
				mode: "tags-split",
				target: outputPath,
				schemas: schemasPath,
				client: "react-query",
				override: {
					mutator: {
						path: mutatorPath,
						name: "customInstance",
					},
					query: {
						useQuery: true,
						useInfinite: true,
						useInfiniteQueryParam: "page",
						options: {
							staleTime: 10000,
						},
					},
					schemas: {
						output: false,
					},
				},
			},
		},
	};
}

module.exports = getOrvalConfig;
