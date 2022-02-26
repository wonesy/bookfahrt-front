import styled from 'styled-components'

export const Flex = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

export const FlexItem = styled.div<{ grow?: number; shrink?: number }>`
    flex: ${(props) => {
        return `${props.grow || 0} ${props.shrink || 0} 0%`
    }};
`
