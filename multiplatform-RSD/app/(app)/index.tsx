import { html, css } from "react-strict-dom";
import { useEffect } from "react";
import { router } from "expo-router";
import { authService } from "@/lib/store/auth-service";
import { useGetApiTrips } from "@/api/generated/trips/trips";
import type { Trip } from "@/api/generated/schemas";
import { Platform } from "react-native";
import { LogoIcon } from "@/assets/icons/LogoIcon/LogoIcon";

const styles = css.create({
	container: {
		padding: "20px",
		maxWidth: "800px",
		marginLeft: "auto",
		marginRight: "auto",
	},
	tripCard: {
		borderWidth: "1px",
		borderStyle: "solid",
		borderColor: "#e0e0e0",
		borderRadius: "4px",
		padding: "10px",
		marginBottom: "10px",
	},
	tripTitle: {
		fontWeight: "bold",
		fontSize: "16px",
		marginBottom: "5px",
	},
	tripDate: {
		fontSize: "14px",
		color: "#666",
	},
	text: {
		fontSize: "16px",
		color: "#000",
	},
	button: {
		marginBottom: "20px",
	}
});

export default function App() {
	const { data: trips, isFetching } = useGetApiTrips();

	useEffect(() => {
		const checkAuth = async () => {
			if (Platform.OS === 'web') {
				return;
			}
			const user = await authService.getUser();
			if (!user) {
				router.replace("/(auth)/login");
			}
		};
		checkAuth();
	}, []);

	const handleLogout = async () => {
		await authService.removeAuth();
		router.replace("/(auth)/login");
	};

	return (
		<html.div style={styles.container}>
			<html.h1 style={styles.text}>Your Trips</html.h1>
			<html.button style={styles.button} onClick={handleLogout}>
				<html.span style={styles.text}>Logout</html.span>
			</html.button>
            <LogoIcon />

			{isFetching ? (
				<html.p style={styles.text}>Loading trips...</html.p>
			) : trips && trips.length > 0 ? (
				trips.map((trip: Trip) => (
					<html.div key={trip.id} style={styles.tripCard}>
						<html.span style={styles.tripTitle}>{trip.title}</html.span>
						<html.span style={styles.tripDate}>
							{new Date(trip.startDate).toLocaleDateString()} -{" "}
							{new Date(trip.endDate).toLocaleDateString()}
						</html.span>
						{trip.description && (
							<html.p style={styles.text}>{trip.description}</html.p>
						)}
					</html.div>
				))
			) : (
				<html.p style={styles.text}>
					No trips found. Create a new trip to get started.
				</html.p>
			)}
		</html.div>
	);
}
