import { ActivityIndicator, FlatList } from "react-native"
import { userService } from "@/src/core/userManager"
import { useTranslate } from "@/src/services/translate"
import { useAuth } from "@src/providers/userProvider"
import { User } from "@src/services/memory/types"
import { useCallback, useEffect, useState } from "react"
import { walletService } from "@src/core/walletManager"
import { SectionHeader } from "../general/section/headers"
import { FollowItem } from "./follow/FollowItem"
import theme from "@src/theme"

type FriendListProps = {
    searchTerm?: string,
    loadCombo?: number,
    toPayment?: boolean,
    searchable?: boolean,
    onPressFollow?: (user: User) => void,
}

export const FriendList = ({ searchTerm, onPressFollow, loadCombo = 20, toPayment = false, searchable }: FriendListProps) => {

    const { user } = useAuth()
    const [listCounter, setListCounter] = useState(loadCombo)
    const [refreshing, setRefreshing] = useState(true)
    const [followList, setFollowList] = useState<User[]>([])
    const [followListData, setFollowListData] = useState<User[]>([])

    useEffect(() => { handleListFollows() }, [])

    if (searchable) {
        useEffect(() => {
            // search and filter
            if (searchTerm && !walletService.address.validate(searchTerm)) {
                const searchResult = followListData.filter(follow => {
                    let filterLower = searchTerm.toLowerCase()
                    let filterNameLower = `${follow.name}${follow.display_name}${follow.displayName}`.toLowerCase()
                    return filterNameLower.includes(filterLower)
                })

                setFollowList(searchResult)
            }
            else if (followListData.length < followList.length)
                setFollowList(followListData)

        }, [searchTerm])
    }

    const handleListFollows = async () => {
        setRefreshing(true)

        var follows = await userService.listFollows(user)

        setFollowList(follows.slice(0, loadCombo))

        setFollowListData(follows)

        setRefreshing(false)
    }

    const handleClickFollow = useCallback((follow: User) => {
        if (onPressFollow)
            onPressFollow(follow)
    }, [])

    const handleLoadScroll = () => {
        setRefreshing(true)
        if (followListData.length > listCounter) {
            setFollowList([...followList, ...followListData.slice(listCounter, listCounter + loadCombo)])
            setListCounter(listCounter + loadCombo)
        }
        setRefreshing(false)
    }

    const handleRenderItem = ({ item }: { item: User }) => <FollowItem key={item.pubkey} follow={item} handleClickFollow={handleClickFollow} />

    const handleLoaderEnd = () => {
        if (refreshing)
            // Show loader at the end of list when fetching next page data.
            return <ActivityIndicator color={theme.colors.gray} style={{ margin: 10 }} size={50} />
    }
    return (
        <>
            <SectionHeader label={useTranslate("labels.friends")} icon="people" actions={[{ label: followListData.length.toString(), action: () => { } }]} />
            <FlatList
                data={followList}
                renderItem={handleRenderItem}
                onEndReached={handleLoadScroll}
                onEndReachedThreshold={.3}
                contentContainerStyle={theme.styles.scroll_container}
                ListFooterComponent={handleLoaderEnd}
            />
        </>
    )
}
