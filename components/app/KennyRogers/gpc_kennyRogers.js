import React, { useRef, useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { CheckBox } from '@rneui/themed';
import { getItem, setItem } from '../../utils/asyncStorage';
const GPCKennyRogers = ({ navigation }) => {

    // Add more state for other positions as needed
    // Add more state for other positions as needed
    const extraSauces = [
        { label: 'Grilled Pineapple', priceChange: '+₱20.00' },
        { label: 'Tex Mex Macaron', priceChange: '+₱80.00' },
        { label: 'Chicken Macaroni', priceChange: '+₱80.00' },
        { label: 'Mac and Cheese', priceChange: '+₱80.00' },
        { label: 'Fresh Fruit Salad', priceChange: '+₱80.00' },
    ];

    const extraParts = [
        { label: 'Chimichurri Sauce - Quarter', priceChange: '+₱30.00' },
        { label: 'Chimichurri Sauce - Half', priceChange: '+₱60.00' },
        { label: 'Chimichurri Sauce - Whole', priceChange: '+₱110.00' },


    ];



    const [loadingScreen, setLoadingScreen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [bgColor, setBgColor] = useState('Level 1');
    const [ies, setIES] = useState('Level 1');
    const [iers, setIERS] = useState('Level 1');
    const [fColor, setFColor] = useState('Level 1');
    const [fSize, setFSize] = useState('Level 1');
    const [cdl, setCDL] = useState('Level 1');

    const decreaseQuantity = () => {
        setQuantity((prevQuantity) => (prevQuantity > 1 ? prevQuantity - 1 : 1));
    };

    const increaseQuantity = () => {
        setQuantity((prevQuantity) => prevQuantity + 1);
    };

    useEffect(() => {
        setLoadingScreen(true);
        fetchData(); // Function to fetch data
    }, []); // Run useEffect whenever navigation state changes


    const fetchData = async () => {
        console.log("fetching");
        setTimeout(async () => {
            try {
                const bgColor1 = await getItem('bgColor');
                if (!bgColor1) {
                    console.log("no bgColor");
                } else {

                    setBgColor(bgColor1);
                }

                const ies1 = await getItem('ies');
                if (!ies1) {
                    console.log("no ies");
                } else {

                    setIES(ies1);
                }

                const iers1 = await getItem('iers');
                if (!iers1) {
                    console.log("no iers");
                } else {

                    setIERS(iers1);
                }

                const fColor1 = await getItem('fColor');
                if (!fColor1) {
                    console.log("no fColor");
                } else {

                    setFColor(fColor1);
                }

                const fSize1 = await getItem('fSize');
                if (!fSize1) {
                    console.log("no fSize");
                } else {

                    setFSize(fSize1);
                }

                const cdl1 = await getItem('cdl');
                if (!cdl1) {
                    console.log("no cdl");
                } else {

                    setCDL(cdl1);
                }

                setLoadingScreen(false);

            } catch (error) {
                console.log(error);
            }
        }, 100);

        console.log(fSize);
    };

    const addToCard = async (itemName, price, imagePath, quantity) => {

        try {


            const item = {
                "name": itemName,
                "price": price,
                "imagePath": imagePath,
                "quantity": quantity
            };

            // Get cartDetails from storage and parse it
            let cartDetailsString = await getItem('cartDetails');

            let cartDetails = cartDetailsString ? JSON.parse(cartDetailsString) : [];

            // If cartDetails doesn't exist, initialize it with an array containing the new item
            if (!cartDetailsString) {
                await setItem('cartDetails', JSON.stringify([item]));

            } else {
                // Check if an item with the same name already exists in cartDetails


                let itemExists = false;
                console.log(cartDetails);
                cartDetails = cartDetails.map(existingItem => {
                    if (existingItem.name === itemName) {
                        // Update quantity and price if the item already exists
                        existingItem.quantity += quantity;
                        existingItem.price += price;
                        itemExists = true;
                    }
                    return existingItem;
                });

                // If the item doesn't exist, add it to cartDetails
                if (!itemExists) {
                    cartDetails.push(item);
                }

                // Update cartDetails in storage after stringify
                await setItem('cartDetails', JSON.stringify(cartDetails));
            }
            navigation.navigate('Homepage');
        } catch (error) {
            console.log(error)
        }
    };
    const [toggleOptions, setToggleOptions] = useState({});

    const toggleOption = (option) => {
        setSelectedOptions((prevState) => ({
            ...prevState,
            [option]: !prevState[option],
        }));
    };

    const [selectedOptions, setSelectedOptions] = useState('');

    const selectedOption = (optionLabel) => {


        setToggleOptions(optionLabel);
    };



    if (loadingScreen) {
        return <View style={styles.loadingContainer}>
            <Text style={[styles.loadingText, { color: bgColor == 'Level 1' ? "#1D601A" : "#298825", fontSize: fSize == 'Level 1' ? 16 : fSize == 'Level 2' ? 18 : 20 }]}>Loading!</Text>
            <ActivityIndicator size="large" color={bgColor == 'Level 1' ? "#1D601A" : "#298825"} />
        </View>
    }

    return (
        <View style={{ flex: 1 }}>
            <Image source={require('../../../assets/finalAssets/gpc_kennyRogers.png')} style={styles.backgroundImage} />
            <TouchableOpacity onPress={() => { navigation.goBack(); }} style={[styles.backButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]}>
                {iers == <Ionicons name="arrow-back" size={14} color={fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'white' : '#0000CC'} />}
                <Text style={[styles.backText, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'white' : '#0000CC' }]}>Back</Text>
            </TouchableOpacity>
            <ScrollView style={styles.detailsContainer}>
                <View style={styles.header}>
                    {cdl == 'Level 1' && <Text style={[styles.restaurantName, { fontSize: 18, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Chimichurri Grilled Pork Chop with Rice, Side Dishes, and Muffin</Text>}
                    {cdl == 'Level 2' && <Text style={[styles.restaurantName, { fontSize: 18, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Pork Chop with Chimichurri Sauce, Rice, Side Dishes, and Muffin</Text>}
                    {cdl == 'Level 3' && <Text style={[styles.restaurantName, { fontSize: 18, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Grilled Marinated Pork Chop with Chimichurri Sauce, 1 Cup of Rice, 2 Side Dishes, and 1 Muffin</Text>}
                    <Text style={[styles.restaurantPrice, { color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>₱440</Text>
                </View>



                <View style={styles.nutrionalContainer}>
                    <Text style={[styles.nutrionalTitle, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Nutritional Information</Text>
                    <View style={styles.nutrionalInfoContainer}>
                        <View style={styles.nutrionalInfoItem}>
                            <Text style={[styles.nutrionalValue, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>920</Text>
                            <Text style={[styles.nutrionalLabel, { fontSize: fSize == 'Level 1' ? 14 : fSize == 'Level 2' ? 16 : 18 }]}>calories</Text>
                        </View>
                        <View style={styles.nutrionalInfoItem}>
                            <Text style={[styles.nutrionalValue, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>41g</Text>
                            <Text style={[styles.nutrionalLabel, { fontSize: fSize == 'Level 1' ? 14 : fSize == 'Level 2' ? 16 : 18 }]}>Carbs</Text>
                        </View>
                        <View style={styles.nutrionalInfoItem}>
                            <Text style={[styles.nutrionalValue, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>92g</Text>
                            <Text style={[styles.nutrionalLabel, { fontSize: fSize == 'Level 1' ? 14 : fSize == 'Level 2' ? 16 : 18 }]}>Fiber</Text>
                        </View>
                        <View style={styles.nutrionalInfoItem}>
                            <Text style={[styles.nutrionalValue, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>8g</Text>
                            <Text style={[styles.nutrionalLabel, { fontSize: fSize == 'Level 1' ? 14 : fSize == 'Level 2' ? 16 : 18 }]}>Protein</Text>
                        </View>
                    </View>
                </View>





                <View style={styles.selectiorContainer}>
                    <Text style={[styles.selectorTitle, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Choice of Side Dish</Text>
                    {extraSauces.map((option, index) => (
                        <View key={index}>
                            <TouchableOpacity

                                style={styles.selectorOption}
                                onPress={() => toggleOption(option.label)}
                            >
                                <CheckBox
                                    checked={selectedOptions[option.label] || false}

                                    onPress={() => toggleOption(option.label)}
                                    checkedColor={bgColor == 'Level 1' ? "#1D601A" : "#298825"}
                                    containerStyle={styles.selectorCheckbox}
                                />
                                <Text style={[styles.selectorOptionText, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>{option.label}</Text>
                                <Text style={[styles.selectorPriceText, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>{option.priceChange}</Text>

                            </TouchableOpacity>
                            <View style={styles.divider} />
                        </View>

                    ))}
                </View>


                <View style={styles.selectiorContainer}>
                    <Text style={[styles.selectorTitle, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>Chimichurri Sauce</Text>
                    {extraParts.map((option, index) => (
                        <View key={index}>
                            <TouchableOpacity

                                style={styles.selectorOption}
                                onPress={() => selectedOption(option.label)}
                            >
                                <CheckBox
                                    checked={toggleOptions === option.label}
                                    onPress={() => selectedOption(option.label)}
                                    checkedColor={bgColor == 'Level 1' ? "#1D601A" : "#298825"}
                                    containerStyle={styles.selectorCheckbox}
                                />
                                <Text style={[styles.selectorOptionText, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>{option.label}</Text>
                                <Text style={[styles.selectorPriceText, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>{option.priceChange}</Text>

                            </TouchableOpacity>
                            <View style={styles.divider} />
                        </View>

                    ))}
                </View>

                <View style={styles.spacing}></View>


            </ScrollView>
            <View style={styles.addTocart}>
                <View style={styles.quantitySelector}>
                    <TouchableOpacity onPress={decreaseQuantity} style={styles.DecreaseQuantityButton}>
                        <Ionicons name="remove-outline" size={ies == 'Level 1' ? 18 : 'Level 2' ? 24 : 30} color="white" />
                    </TouchableOpacity>
                    <Text style={[styles.quantityText, { fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'black' : '#0000CC' }]}>{quantity}</Text>
                    <TouchableOpacity onPress={increaseQuantity} style={[styles.IncreaseQuantityButton, { backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]}>
                        <Ionicons name="add-outline" size={ies == 'Level 1' ? 18 : 'Level 2' ? 24 : 30} color="white" />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity style={[styles.addToCartButton, { paddingHorizontal: 40, backgroundColor: bgColor == 'Level 1' ? "#1D601A" : "#298825" }]} onPress={() => { addToCard(cdl == 'Level 1' ? "Chimichurri Grilled Pork Chop with Rice, Side Dishes, and Muffin" : 'Level 2' ? "Pork Chop with Chimichurri Sauce, Rice, Side Dishes, and Muffin" : "Grilled Marinated Pork Chop with Chimichurri Sauce, 1 Cup of Rice, 2Side Dishes, and 1 Muffin", 440, "../../assets/finalAssets/gpc_kennyRogers.png", quantity) }} >
                    <Text style={[styles.addToCartText, { paddingVertical: ies == 'Level 2' ? 4 : 0, fontSize: fSize == 'Level 1' ? 12 : 14, color: fColor == 'Level 1' ? '#AD0202' : fColor == 'Level 2' ? 'white' : '#0000CC' }]}>Add to Cart</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        aspectRatio: 2.5, // Adjust the aspect ratio based on your image
        position: 'absolute',
    },
    spacing: {
        marginBottom: 100
    },

    backButton: {
        position: 'absolute',
        top: 40, // Adjust the position as needed
        left: 10,
        zIndex: 10, // Ensure the button is above all other content
        backgroundColor: "#D00202",
        padding: 10,
        borderRadius: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    backButtonText: {
        // Style for the back button text
    },
    detailsContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopRightRadius: 25,
        borderTopLeftRadius: 25,
        marginTop: 200, // Adjust based on the size of the background image
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        paddingHorizontal: 10,

    },
    subtitle: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 5,
        paddingHorizontal: 30,

    },
    category: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignContent: 'center',
        alignItems: 'center',
        paddingTop: 15,
        paddingLeft: 10,


    },
    restaurantName: {
        fontWeight: 'bold',
        fontSize: 18,
        width: 240,
        margin: 10,
    },
    restaurantPrice: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 10,
    },

    categories: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginBottom: 10,
    },

    OptionTopRow: {
        flexDirection: 'row',
        paddingHorizontal: 5,
        justifyContent: 'space-evenly'
    },
    item: {
        backgroundColor: '#F2F2F2',
        borderRadius: 20,
        width: '48%', // Two columns, adjust for spacing
        marginVertical: 10,
        alignContent: 'center',
        justifyContent: 'center',
        alignItems: 'center',


    },
    itemImage: {
        width: '100%',
        height: 140,
        borderRadius: 10,
    },
    addButton: {
        position: 'absolute',
        right: 10,
        bottom: 65,
        backgroundColor: '#FFC700',
        borderRadius: 100,
        padding: 8,
    },

    itemDetails: {
        flexDirection: 'column'
    },

    divider: {
        height: 1,
        backgroundColor: '#707070',
        marginHorizontal: 40,
        marginTop: 15

    },
    addTocart: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#fff',
        borderTopWidth: 1,
        borderTopColor: '#e2e2e2',
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
    },
    quantitySelector: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 15
    },
    DecreaseQuantityButton: {
        padding: 10,
        backgroundColor: '#6D6D6D',
        borderRadius: 25,
        elevation: 3
    },
    IncreaseQuantityButton: {
        padding: 10,

        borderRadius: 25,
        elevation: 3
    },
    quantityText: {
        paddingHorizontal: 20,
        fontWeight: 'bold',
    },
    addToCartButton: {

        borderRadius: 25,
        paddingVertical: 10,
        paddingHorizontal: 30,
        elevation: 3
    },
    addToCartText: {
        color: 'white',
        fontWeight: 'bold',
    },
    backText: {
        marginLeft: 5,
        fontWeight: 'bold',
    },
    loadingText: {
        paddingTop: 20,
        paddingBottom: 5,
        fontWeight: 'bold',

    },
    loadingContainer: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        backgroundColor: 'White', // Semi-transparent background
    },
    selectiorContainer: {
        backgroundColor: '#FAFAFA',
        marginHorizontal: 20,
        paddingHorizontal: 20,
        paddingTop: 20
    },
    selectorTitle: {

        fontWeight: 'bold',
        marginBottom: 10,
    },
    selectorOption: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',

    },
    selectorCheckbox: {
        // You can customize the checkbox style
        padding: 0,
        margin: 0,
        marginLeft: 0,
        marginRight: 0,
        borderWidth: 0,
        backgroundColor: 'transparent',
    },
    selectorOptionText: {
        fontSize: 16,
        flex: 1,
        // Add other styling as needed
    },
    selectorPriceText: {
        fontSize: 16,
        fontWeight: 'bold',
        // Add other styling as needed
    },
    divider: {
        height: 1,
        backgroundColor: 'grey',
        marginHorizontal: 5,
        marginTop: 10,
        marginBottom: 10,

    },
    nutrionalContainer: {
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        margin: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.52,
        shadowRadius: 3.22,
        elevation: 5,
    },
    nutrionalTitle: {

        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    nutrionalInfoContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
    nutrionalInfoItem: {
        alignItems: 'center',
    },
    nutrionalValue: {
        fontWeight: 'bold',
        marginBottom: 2,
    },
    nutrionalLabel: {
        fontSize: 14,
        color: 'grey',
    },
    // ... additional styles for dishes and other elements
});

export default GPCKennyRogers;
