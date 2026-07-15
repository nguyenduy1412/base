# Tooltip

Component tooltip dùng chung của project. Tooltip tự giới hạn chiều rộng theo màn hình, tự xuống dòng và tự chọn hiển thị phía trên hoặc dưới anchor.

- Bấm ra ngoài để đóng tooltip.
- Tại một thời điểm chỉ có một tooltip được mở.
- Bấm vào trigger khác sẽ đóng tooltip cũ và mở tooltip mới.

## Cách dùng cơ bản

```tsx
import Tooltip from "@/components/Tooltip";

<Tooltip content="Personalise rewards and alerts">
  <Text>Tell us about Bella</Text>
</Tooltip>;
```

`children` là phần tử người dùng bấm vào. `content` là nội dung hiển thị trong tooltip.

## Dùng với icon

```tsx
<Tooltip
  content="Age helps us recommend suitable activities"
  accessibilityLabel="Show age information"
>
  <Icon name="Infomation" size={16} />
</Tooltip>
```

## Nội dung dài

Nội dung sẽ tự xuống dòng. Mặc định tooltip rộng tối đa `82%` màn hình và không vượt quá `360px`.

```tsx
<Tooltip
  content="This information helps us personalise recommendations, rewards and alerts for your dog."
  maxWidthRatio={0.8}
  maxWidth={320}
>
  <Text>Why do we need this?</Text>
</Tooltip>
```

## Chọn vị trí hiển thị

`auto` là giá trị mặc định và được khuyến nghị. Tooltip sẽ chọn phía có đủ không gian.

```tsx
<Tooltip content="Auto placement" placement="auto">
  <Text>Auto</Text>
</Tooltip>

<Tooltip content="Always above" placement="top">
  <Text>Top</Text>
</Tooltip>

<Tooltip content="Always below" placement="bottom">
  <Text>Bottom</Text>
</Tooltip>
```

## Chỉnh vị trí arrow

```tsx
<Tooltip content="Follow the anchor" arrowAlignment="auto">
  <Text>Auto arrow</Text>
</Tooltip>

<Tooltip content="Arrow on the left" arrowAlignment="left">
  <Text>Left arrow</Text>
</Tooltip>

<Tooltip content="Arrow in the center" arrowAlignment="center">
  <Text>Center arrow</Text>
</Tooltip>

<Tooltip content="Arrow on the right" arrowAlignment="right">
  <Text>Right arrow</Text>
</Tooltip>
```

## Truyền component làm content

```tsx
<Tooltip
  content={
    <View className="gap-1">
      <Text className="text-white">Custom title</Text>
      <Text className="text-white">Custom description</Text>
    </View>
  }
>
  <Text>Custom tooltip</Text>
</Tooltip>
```

## Điều khiển đóng/mở từ bên ngoài

```tsx
const [visible, setVisible] = useState(false);

<Tooltip
  content="Controlled tooltip"
  isVisible={visible}
  onVisibilityChange={setVisible}
>
  <Text>Open tooltip</Text>
</Tooltip>;
```

## Tuỳ chỉnh giao diện

```tsx
<Tooltip
  content="Custom appearance"
  backgroundColor="#3B7A57"
  borderColor="#FFFFFF"
  borderWidth={2}
  borderRadius={16}
  minWidth={180}
  contentStyle={{ paddingHorizontal: 24 }}
>
  <Text>Styled tooltip</Text>
</Tooltip>
```

Các giá trị chính:

- `placement`: `"auto" | "top" | "bottom"`
- `arrowAlignment`: `"auto" | "left" | "center" | "right"`
- `maxWidthRatio`: tỷ lệ chiều rộng tooltip so với màn hình
- `maxWidth`: giới hạn chiều rộng tuyệt đối
- `disabled`: tắt khả năng mở tooltip
