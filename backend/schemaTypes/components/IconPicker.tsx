import {Box, Button, Card, Flex, Grid, Text, TextInput} from '@sanity/ui'
import {useMemo, useState} from 'react'
import type {StringInputProps} from 'sanity'
import {set, unset} from 'sanity'
import {LUCIDE_OPTIONS, lucideMap} from '../../utils/icons/lucide-map'

export default function IconPicker({onChange, value}: StringInputProps) {
  const [search, setSearch] = useState('')

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return q ? LUCIDE_OPTIONS.filter((o) => o.title.toLowerCase().includes(q)) : LUCIDE_OPTIONS
  }, [search])

  const SelectedIcon = value ? lucideMap[value] : null
  const selectedTitle = value ? LUCIDE_OPTIONS.find((o) => o.value === value)?.title : null

  return (
    <Flex direction="column" gap={3}>
      {value && SelectedIcon && (
        <Card padding={3} radius={2} tone="primary">
          <Flex align="center" justify="space-between">
            <Flex align="center" gap={3}>
              <SelectedIcon size={32} strokeWidth={1.5} />
              <Text size={2} weight="semibold">
                {selectedTitle}
              </Text>
            </Flex>
            <Button
              text="Quitar"
              tone="critical"
              mode="ghost"
              fontSize={1}
              padding={2}
              onClick={() => onChange(unset())}
            />
          </Flex>
        </Card>
      )}
      <TextInput
        placeholder="Buscar ícono..."
        value={search}
        onChange={(e) => setSearch(e.currentTarget.value)}
      />

      {search && (
        <Text size={1} muted>
          {filtered.length} resultado{filtered.length !== 1 ? 's' : ''}
        </Text>
      )}

      <Box
        style={{
          maxHeight: 280,
          overflowY: 'auto',
          border: '1px solid var(--card-border-color)',
          borderRadius: 4,
        }}
      >
        <Grid columns={4} gap={1} padding={2}>
          {filtered.map(({title, value: key}) => {
            const Icon = lucideMap[key]
            if (!Icon) return null

            const isActive = value === key

            return (
              <Card
                key={key}
                as="button"
                type="button"
                onClick={() => onChange(set(key))}
                padding={3}
                radius={2}
                tone={isActive ? 'primary' : 'default'}
                style={{cursor: 'pointer', border: 'none', minHeight: 80}}
              >
                <Flex direction="column" align="center" justify="center" gap={2}>
                  <Icon size={32} strokeWidth={1.5} />
                  <Text
                    size={0}
                    weight={isActive ? 'semibold' : 'regular'}
                    style={{
                      textAlign: 'center',
                      wordBreak: 'break-word',
                      lineHeight: 1.2,
                    }}
                  >
                    {title}
                  </Text>
                </Flex>
              </Card>
            )
          })}
        </Grid>
      </Box>

      {filtered.length === 0 && (
        <Text align="center" muted>{`Sin resultados para "${search}"`}</Text>
      )}
    </Flex>
  )
}
