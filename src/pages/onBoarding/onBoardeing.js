import React, { useEffect, useState } from 'react'
import {
    Text,
    Image,
    Dimensions,
    StyleSheet,
    View,
    FlatList,
    TouchableOpacity,
    StatusBar,
    SafeAreaView
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const { width, height } = Dimensions.get("screen")



const screens = [{
    id: 1,
    image: require('../../pics/1.png'),
    text: 'Explore',
    title: 'Explore your fav dest all over egypt',
    buttoms: "next"

}, {
    id: 2,
    image: require('../../pics/2.png'),
    text: 'Book & pay online',
    title: 'Explore your fav dest all over egypt',
    buttoms: "next"

}, {
    id: 3,
    image: require('../../pics/3.png'),
    text: 'Enjoy your holiday',
    title: 'Explore your fav dest all over egypt',
    buttoms: "next"
}, {
    id: 4,
    image: require('../../pics/4.png'),
    text: 'Hungry for Offer ?',
    title: 'Explore your fav dest all over egypt',
    buttoms: "Allow Push notification"

}
]


const OnBoarding = () => {
    const [appOpened, setAppOpened] = useState(true);

    const storeData = () => {
        AsyncStorage.setItem('appOpened', JSON.stringify(appOpened))
        console.log("onBoarding" + appOpened)
    }
    useEffect(() => {
        storeData()
    }, [currentSlideIndex])


    const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);
    const ref = React.useRef();
    const updateCurrentSlideIndex = e => {
        const contentOffsetX = e.nativeEvent.contentOffset.x;
        const currentIndex = Math.round(contentOffsetX / width);
        setCurrentSlideIndex(currentIndex);
    };
    const skip = () => {
        const lastSlideIndex = screens.length - 1;
        const offset = lastSlideIndex * width;
        ref?.current.scrollToOffset({ offset });
        setCurrentSlideIndex(lastSlideIndex);
    };
    const goToNextSlide = () => {
        const nextSlideIndex = currentSlideIndex + 1;
        if (nextSlideIndex != screens.length) {
            const offset = nextSlideIndex * width;
            ref?.current.scrollToOffset({ offset });
            setCurrentSlideIndex(currentSlideIndex + 1);
        }
    };


    const Slide = ({ item }) => {
        return (
            <View style={{ alignItems: 'center', width: width }}>
                <Image
                    source={item.image}
                    style={styles.image}
                    resizeMode="stretch"
                />
                <Text style={styles.text}>
                    {item.text}
                </Text>
                <Text style={styles.title}>
                    {item.title}
                </Text>
                <TouchableOpacity style={styles.nextButtom}
                    onPress={currentSlideIndex == screens.length - 1 ? (skip) : (goToNextSlide)}
                >
                    <Text style={styles.text_in_buttom}>
                        {item.buttoms}
                    </Text>
                </TouchableOpacity>
                {currentSlideIndex != screens.length - 1 ?
                    <>
                        {null}
                    </>
                    : <>
                        <TouchableOpacity style={styles.skipButtom}
                            onPress={currentSlideIndex == screens.length - 1 ? (skip) : (goToNextSlide)}
                        >
                            <Text style={styles.text_in_buttom}>
                                Skip
                            </Text>
                        </TouchableOpacity>
                    </>}
            </View>
        )
    }

    return (
        <>
            <SafeAreaView style={styles.container}>
                <StatusBar backgroundColor="#282534" />
                <FlatList
                    ref={ref}
                    onMomentumScrollEnd={updateCurrentSlideIndex}
                    pagingEnabled={true}
                    horizontal={true}
                    contentContainerStyle={{ height: height }}
                    showsHorizontalScrollIndicator={false}
                    data={screens}
                    renderItem={({ item, index }) => <Slide item={item} />
                    }
                />

            </SafeAreaView>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#282534",
        paddingTop: height * .04,

    },
    text: {
        color: '#FFFFFF',
        fontSize: 28,
        fontWeight: 'bold',
        fontFamily: 'sant-serif',
        textAlign: 'center',
        marginTop: height * .03
    },
    title: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'serif',
        textAlign: 'center',
        marginTop: height * .02
    },
    image: {
        height: height * .45,
        width: width * .95,
        resizeMode: 'contain',
    },
    skipButtom: {
        width: width * .9,
        height: height * .08,
        backgroundColor: "#f57c00",
        borderRadius: 30,
        marginTop: height * 0.01,
        alignItems: 'center',
        justifyContent: "center"
    },
    nextButtom: {
        paddingHorizontal: 60,
        height: height * .08,
        backgroundColor: "#f57c00",
        borderRadius: 30,
        marginTop: height * 0.08,
        alignItems: 'center',
        justifyContent: "center"
    },
    text_in_buttom: {
        color: '#FFFFFF',
        fontSize: 20,
        fontFamily: 'sant-serif',
        textAlign: 'center',
    }


})

export default OnBoarding