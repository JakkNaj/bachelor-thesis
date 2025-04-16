# ActivityContextMenu Implementation Notes

## Initial Problem
When converting the ActivityContextMenu from react-strict-dom to React Native components, we encountered issues with click-outside detection. The original implementation used refs with HTMLElement types:

```typescript
const menuRef = useRef<HTMLDivElement>(null);
const buttonRef = useRef<HTMLButtonElement>(null);
```

This caused TypeScript errors because React Native's View component doesn't match HTML element types:
```
Type 'RefObject<HTMLButtonElement>' is not assignable to type 'LegacyRef<View>'
```

## Solution Using nativeID
We resolved the issue by using React Native's nativeID prop instead of refs. This approach is:
1. Cross-platform compatible
2. Type-safe
3. More performant
4. Easier to maintain

### How nativeID Works
1. On Web:
   - Translates directly to HTML id attribute
   - Example: `<View nativeID="menu" />` becomes `<div id="menu" />`
   - Allows using standard DOM methods like `closest()`

2. On Native (iOS/Android):
   - iOS: Maps to accessibilityIdentifier
   - Android: Maps to View's ID property
   - Provides native platform identification

### Implementation
```typescript
// Component structure
<View style={styles.container}>
    <Pressable 
        nativeID="activity-button"
        onPress={handleOpenMenu}
    >
        <DotsIcon />
    </Pressable>

    {isMenuVisible && (
        <View 
            nativeID="activity-menu"
            style={styles.menuContainer}
        >
            {/* Menu content */}
        </View>
    )}
</View>

// Click outside detection
useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        const target = event.target as HTMLElement;
        if (!target.closest('#activity-menu') && 
            !target.closest('#activity-button')) {
            setIsMenuVisible(false);
        }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
        document.removeEventListener('mousedown', handleClickOutside);
    };
}, []);
```

### Benefits of This Approach
1. No TypeScript errors with React Native components
2. Works consistently across platforms
3. Better performance than ref-based solutions
4. Simpler code maintenance
5. No need for complex type assertions or workarounds

### Best Practices
1. Use unique, descriptive IDs to avoid conflicts
2. Prefix IDs with component-specific identifiers
3. Use nativeID only when necessary for direct element access
4. Keep ID naming consistent throughout the application

## Alternative Approaches Considered
1. Using refs with type assertions (rejected due to type safety concerns)
2. Using data attributes (rejected due to React Native compatibility)
3. Using class names (rejected due to platform inconsistency)

## Future Considerations
1. Consider implementing a reusable click-outside hook
2. Monitor performance with large numbers of context menus
3. Consider adding automated tests using nativeIDs as selectors
