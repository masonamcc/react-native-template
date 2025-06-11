import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useVideoPlayer, VideoView } from 'expo-av';
import { useEvent } from 'expo';

export default function StingerTransition({ onFinish }) {
    const player = useVideoPlayer(require('../assets/stingers/default.mp4'), (player) => {
        player.loop = false;
        player.play();
    });

    const [hasEnded, setHasEnded] = useState(false);

    useEvent(player, 'ended', () => {
        setHasEnded(true);
    });

    useEffect(() => {
        if (hasEnded) {
            onFinish();
        }
    }, [hasEnded]);

    useEffect(() => {
        const fallback = setTimeout(() => {
            onFinish();
        }, 2000);
        return () => clearTimeout(fallback);
    }, []);

    return (
        <View style={styles.container}>
            <VideoView
                player={player}
                style={StyleSheet.absoluteFill}
                allowsFullscreen={true}
                allowsPictureInPicture={false}
                resizeMode="cover"
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 999,
        backgroundColor: 'black',
    },
});
