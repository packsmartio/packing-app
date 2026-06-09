　import React, { useState, useMemo, useEffect } from "react";

const TRANSLATIONS = {
  ja: {
    appSub: "PACK SMART", appTitle: "忘れ物ゼロ",
    tabs: ["イベント", "持ち物", "設定"],
    addEvent: "＋ イベント", addItem: "＋ 追加", newEvent: "新しいイベント",
    eventName: "イベント名", eventNamePlaceholder: "例：実家への帰省",
    periodic: "定期", oneTime: "単発", cancel: "キャンセル", create: "作成", save: "保存",
    deleteEvent: "🗑 このイベントを削除", editEvent: "イベントを編集", copySuffix: " のコピー", viewItems: "持ち物を見る", copyEvent: "📋 このイベントをコピー", copyEventTitle: "コピーして新規作成", copyEventConfirm: "コピーして作成",
    items: "アイテム", done: "完了", noItems: "アイテムがありません",
    noItemsHint: "＋ボタンをタップして追加しましょう",
    storageFull: "容量が足りません。不要なイベントを削除してください。", nameRequired: "イベント名を入力してください", itemNameRequired: "アイテム名を入力してください", qtyRequired: "個数を1以上にしてください", sortDay: "日程順", sortPrep: "準備方法順", sortName: "名前順", sortQtyDesc: "個数が多い順", sortQtyAsc: "個数が少ない順", sortCustom: "並び替え", sortDone: "完了",
    prepAll: "準備: すべて", addTo: (name) => `${name} に追加`,
    itemName: "アイテム名", itemNamePlaceholder: "例：充電器、着替え、パスポート",
    qty: "個数", qtyUnit: "個", days: "何日目に使う？（複数OK）", daysUnit: "日目",
    resetDays: "リセット", prepMethod: "準備方法",
    prepMethods: ["家にある", "買う", "レンタル", "その他"],
    whereLabel: "どこで買う？", prepOtherLabel: "詳細（任意）", customPrepLabel: "準備方法を追加", customPrepPlaceholder: "例：現地調達", wherePlaceholder: "例：コンビニ、ドラッグストア",
    category: "カテゴリ", categories: ["衣類", "書類", "電子機器", "日用品", "食べ物", "その他"],
    tags: "オリジナルタグ（複数OK）", addToList: "✓ リストに追加する",
    settings: "設定", useCat: "カテゴリ機能を使う", useCatDesc: "OFFにするとカテゴリが非表示になります",
    manageTags: "オリジナルタグを管理", manageTagsDesc: "カテゴリとは別の自由なグループ分けができます",
    resetChecks: "もう一度使う（チェックをリセット）", noTags: "タグがまだありません",
    newTag: "新しいタグ名", addTag: "追加", editItem: "アイテムを編集", deleteItem: "🗑 削除",
    language: "言語", selectEvent: "イベントを選択",
    selectEventHint: "「イベント」タブからイベントを選んでください",
    sampleModalTitle: "サンプルデータを追加しますか？",
    sampleModalDesc: "旅行の例を追加して、使い方をすぐに確認できます。後から削除できます。",
    sampleModalYes: "✨ 追加する", sampleModalNo: "空の状態で始める",
    langSelectTitle: "言語を選んでください", langSelectBtn: "次へ →",
    resetLang: "言語を選び直す（サンプルも変わります）",
    tutorialReplayTitle: "使い方をもう一度見る", tutorialReplayDesc: "アプリの基本的な使い方を確認できます",
    tutorialSkip: "スキップ", tutorialNext: "次へ", tutorialStart: "はじめる",
    dateStart: "出発日", dateEnd: "帰宅日", dateRange: (s, e) => `${s} 〜 ${e}`,
    tutorialSteps: [
      { emoji: "📅", title: "イベントを作ろう", desc: "旅行・帰省・キャンプなど、「イベント」を登録します。定期イベントも単発イベントも管理できます。", hint: "まず「＋イベント」をタップ！" },
      { emoji: "🎒", title: "持ち物を追加する", desc: "各アイテムに「個数」「使う日」「準備方法」を設定。何を、いつ、どこで用意するかが一目でわかります。", hint: "「追加」タブからアイテムを登録" },
      { emoji: "✅", title: "準備しながらチェック", desc: "準備できたらタップしてチェック！進捗バーで全体の進み具合が確認できます。定期イベントはリセットして繰り返し使えます。", hint: "チェックでグレーアウト → リセットで再利用" },
      { emoji: "🏷️", title: "タグ・コピーで効率化", desc: "カテゴリや自分だけのタグで荷物を整理。去年と同じ旅行は📋ボタンでまるごとコピー！日付とタイトルを変えるだけで再利用できます。", hint: "📋コピー → タイトル・日付を編集 → 完成" },
    ],
  },
  en: {
    appSub: "PACK SMART", appTitle: "Never Forget",
    tabs: ["Events", "List", "Settings"],
    addEvent: "+ Event", addItem: "+ Add", newEvent: "New Event",
    eventName: "Event Name", eventNamePlaceholder: "e.g. Summer vacation",
    periodic: "Recurring", oneTime: "One-time", cancel: "Cancel", create: "Create", save: "Save",
    deleteEvent: "🗑 Delete this event", editEvent: "Edit Event", copySuffix: " (Copy)", viewItems: "View packing list", copyEvent: "📋 Duplicate this event", copyEventTitle: "Duplicate event", copyEventConfirm: "Duplicate & Create",
    items: "items", done: "done", noItems: "No items yet",
    noItemsHint: "Tap the + button to add items",
    storageFull: "Storage is full. Please delete some events to free up space.", nameRequired: "Please enter an event name", itemNameRequired: "Please enter an item name", qtyRequired: "Please set quantity to at least 1", sortDay: "By day", sortPrep: "By prep", sortName: "By name", sortQtyDesc: "Most first", sortQtyAsc: "Least first", sortCustom: "Reorder", sortDone: "Done",
    prepAll: "Prep: All", addTo: (name) => `Add to: ${name}`,
    itemName: "Item Name", itemNamePlaceholder: "e.g. Charger, Clothes, Passport",
    qty: "Quantity", qtyUnit: "", days: "Which day(s)? (multi-select OK)", daysUnit: "",
    resetDays: "Reset", prepMethod: "How to prepare",
    prepMethods: ["Have it", "Buy it", "Rent it", "Other"],
    whereLabel: "Where to buy?", prepOtherLabel: "Details (optional)", customPrepLabel: "Add prep method", customPrepPlaceholder: "e.g. Buy locally", wherePlaceholder: "e.g. Pharmacy, Supermarket",
    category: "Category", categories: ["Clothing", "Documents", "Electronics", "Toiletries", "Food", "Other"],
    tags: "Custom Tags (multi-select OK)", addToList: "✓ Add to List",
    settings: "Settings", useCat: "Use Category feature", useCatDesc: "Turn off to hide categories",
    manageTags: "Manage Custom Tags", manageTagsDesc: "Create your own grouping labels",
    resetChecks: "Use again (reset checks)", noTags: "No tags yet",
    newTag: "New tag name", addTag: "Add", editItem: "Edit Item", deleteItem: "🗑 Delete",
    language: "Language", selectEvent: "Select an event",
    selectEventHint: "Choose an event from the \"Events\" tab",
    sampleModalTitle: "Add sample data?",
    sampleModalDesc: "Add a sample trip to explore the app. You can delete it anytime.",
    sampleModalYes: "✨ Add sample", sampleModalNo: "Start empty",
    langSelectTitle: "Choose your language", langSelectBtn: "Next →",
    resetLang: "Change language & reset sample data",
    tutorialReplayTitle: "View tutorial again", tutorialReplayDesc: "Review how to use the app",
    tutorialSkip: "Skip", tutorialNext: "Next", tutorialStart: "Get Started",
    dateStart: "Departure", dateEnd: "Return", dateRange: (s, e) => `${s} – ${e}`,
    tutorialSteps: [
      { emoji: "📅", title: "Create an Event", desc: "Add trips, visits, or any outing as an \"Event\". Supports both recurring and one-time events.", hint: "Tap \"+ Event\" to get started!" },
      { emoji: "🎒", title: "Add Your Items", desc: "For each item, set the quantity, which day you need it, and how you'll prepare it. Everything is visible at a glance.", hint: "Use the \"Add\" tab to register items" },
      { emoji: "✅", title: "Check Off as You Pack", desc: "Tap an item to check it off. A progress bar tracks how ready you are. Recurring events can be reset and reused.", hint: "Check → grey out → reset to reuse" },
      { emoji: "🏷️", title: "Tags, Copy & Reuse", desc: "Organize with categories and custom tags. Going on a similar trip? Tap 📋 to duplicate any event — just update the title and dates!", hint: "📋 Copy → edit title & dates → done" },
    ],
  },
  fr: {
    appSub: "PACK SMART", appTitle: "Zéro Oubli",
    tabs: ["Événements", "Liste", "Réglages"],
    addEvent: "+ Événement", addItem: "+ Ajouter", newEvent: "Nouvel événement",
    eventName: "Nom de l'événement", eventNamePlaceholder: "ex : Vacances d'été",
    periodic: "Récurrent", oneTime: "Unique", cancel: "Annuler", create: "Créer", save: "Enregistrer",
    deleteEvent: "🗑 Supprimer cet événement", editEvent: "Modifier l'événement", copySuffix: " (Copie)", viewItems: "Voir la liste", copyEvent: "📋 Dupliquer cet événement", copyEventTitle: "Dupliquer l'événement", copyEventConfirm: "Dupliquer et créer",
    items: "articles", done: "fait", noItems: "Aucun article",
    noItemsHint: "Appuyez sur + pour ajouter des articles",
    storageFull: "Stockage plein. Veuillez supprimer des événements.", nameRequired: "Veuillez saisir un nom d'événement", itemNameRequired: "Veuillez saisir un nom d'article", qtyRequired: "Veuillez définir une quantité d'au moins 1", sortDay: "Par jour", sortPrep: "Par préparation", sortName: "Par nom", sortQtyDesc: "Plus grande qté", sortQtyAsc: "Plus petite qté", sortCustom: "Réordonner", sortDone: "Terminer",
    prepAll: "Prép : Tous", addTo: (name) => `Ajouter à : ${name}`,
    itemName: "Nom de l'article", itemNamePlaceholder: "ex : Chargeur, Vêtements, Passeport",
    qty: "Quantité", qtyUnit: "", days: "Quel(s) jour(s) ? (multi-sélection OK)", daysUnit: "",
    resetDays: "Réinitialiser", prepMethod: "Comment préparer",
    prepMethods: ["J'ai déjà", "Acheter", "Louer", "Autre"],
    whereLabel: "Où acheter ?", prepOtherLabel: "Détails (optionnel)", customPrepLabel: "Ajouter méthode", customPrepPlaceholder: "ex: Acheter sur place", wherePlaceholder: "ex : Pharmacie, Supermarché",
    category: "Catégorie", categories: ["Vêtements", "Documents", "Électronique", "Toilettes", "Nourriture", "Autre"],
    tags: "Tags personnalisés (multi OK)", addToList: "✓ Ajouter à la liste",
    settings: "Réglages", useCat: "Utiliser les catégories", useCatDesc: "Désactiver pour masquer les catégories",
    manageTags: "Gérer les tags", manageTagsDesc: "Créez vos propres étiquettes",
    resetChecks: "Réutiliser (réinitialiser)", noTags: "Pas encore de tags",
    newTag: "Nouveau tag", addTag: "Ajouter", editItem: "Modifier l'article", deleteItem: "🗑 Supprimer",
    language: "Langue", selectEvent: "Sélectionner un événement",
    selectEventHint: "Choisissez un événement depuis l'onglet \"Événements\"",
    sampleModalTitle: "Ajouter des données exemple ?",
    sampleModalDesc: "Ajoutez un voyage exemple pour explorer l'app. Vous pouvez le supprimer à tout moment.",
    sampleModalYes: "✨ Ajouter", sampleModalNo: "Commencer vide",
    langSelectTitle: "Choisissez votre langue", langSelectBtn: "Suivant →",
    resetLang: "Changer la langue et réinitialiser",
    tutorialReplayTitle: "Revoir le tutoriel", tutorialReplayDesc: "Revoyez comment utiliser l'app",
    tutorialSkip: "Passer", tutorialNext: "Suivant", tutorialStart: "Commencer",
    dateStart: "Départ", dateEnd: "Retour", dateRange: (s, e) => `${s} – ${e}`,
    tutorialSteps: [
      { emoji: "📅", title: "Créer un événement", desc: "Ajoutez des voyages, visites ou sorties comme \"Événements\".", hint: "Appuyez sur \"+ Événement\" !" },
      { emoji: "🎒", title: "Ajouter vos articles", desc: "Pour chaque article, définissez la quantité, le jour et la méthode de préparation.", hint: "Utilisez l'onglet \"Ajouter\"" },
      { emoji: "✅", title: "Cochez au fur et à mesure", desc: "Tapez pour cocher. Une barre de progression suit votre avancement.", hint: "Cocher → grisé → réinitialiser" },
      { emoji: "🏷️", title: "Tags, copie et réutilisation", desc: "Organisez avec des catégories et vos propres tags. Voyage similaire ? Appuyez sur 📋 pour dupliquer un événement — changez juste le titre et les dates !", hint: "📋 Copier → modifier titre & dates → terminé" },
    ],
  },
  pt: {
    appSub: "PACK SMART", appTitle: "Zero Esquecimento",
    tabs: ["Eventos", "Lista", "Config"],
    addEvent: "+ Evento", addItem: "+ Adicionar", newEvent: "Novo Evento",
    eventName: "Nome do Evento", eventNamePlaceholder: "ex: Férias de verão",
    periodic: "Recorrente", oneTime: "Único", cancel: "Cancelar", create: "Criar", save: "Salvar",
    deleteEvent: "🗑 Excluir este evento", editEvent: "Editar Evento", copySuffix: " (Cópia)", viewItems: "Ver a lista", copyEvent: "📋 Duplicar este evento", copyEventTitle: "Duplicar evento", copyEventConfirm: "Duplicar e criar",
    items: "itens", done: "feito", noItems: "Nenhum item ainda",
    noItemsHint: "Toque em + para adicionar itens",
    storageFull: "Armazenamento cheio. Exclua alguns eventos.", nameRequired: "Por favor, insira um nome de evento", itemNameRequired: "Por favor, insira um nome de item", qtyRequired: "Por favor, defina a quantidade para pelo menos 1", sortDay: "Por dia", sortPrep: "Por preparo", sortName: "Por nome", sortQtyDesc: "Maior qtd", sortQtyAsc: "Menor qtd", sortCustom: "Reordenar", sortDone: "Concluir",
    prepAll: "Prep: Todos", addTo: (name) => `Adicionar a: ${name}`,
    itemName: "Nome do Item", itemNamePlaceholder: "ex: Carregador, Roupas, Passaporte",
    qty: "Quantidade", qtyUnit: "", days: "Qual(is) dia(s)? (múltipla seleção OK)", daysUnit: "",
    resetDays: "Resetar", prepMethod: "Como preparar",
    prepMethods: ["Já tenho", "Comprar", "Alugar", "Outro"],
    whereLabel: "Onde comprar?", prepOtherLabel: "Detalhes (opcional)", customPrepLabel: "Adicionar método", customPrepPlaceholder: "ex: Comprar localmente", wherePlaceholder: "ex: Farmácia, Supermercado",
    category: "Categoria", categories: ["Roupas", "Documentos", "Eletrônicos", "Higiene", "Comida", "Outro"],
    tags: "Tags personalizadas (multi OK)", addToList: "✓ Adicionar à Lista",
    settings: "Configurações", useCat: "Usar categorias", useCatDesc: "Desative para ocultar categorias",
    manageTags: "Gerenciar Tags", manageTagsDesc: "Crie seus próprios rótulos",
    resetChecks: "Usar novamente (resetar)", noTags: "Nenhuma tag ainda",
    newTag: "Nome da nova tag", addTag: "Adicionar", editItem: "Editar Item", deleteItem: "🗑 Excluir",
    language: "Idioma", selectEvent: "Selecionar evento",
    selectEventHint: "Escolha um evento na aba \"Eventos\"",
    sampleModalTitle: "Adicionar dados de exemplo?",
    sampleModalDesc: "Adicione uma viagem de exemplo para explorar o app. Você pode excluir quando quiser.",
    sampleModalYes: "✨ Adicionar", sampleModalNo: "Começar vazio",
    langSelectTitle: "Escolha seu idioma", langSelectBtn: "Próximo →",
    resetLang: "Mudar idioma e redefinir exemplo",
    tutorialReplayTitle: "Ver tutorial novamente", tutorialReplayDesc: "Revise como usar o app",
    tutorialSkip: "Pular", tutorialNext: "Próximo", tutorialStart: "Começar",
    dateStart: "Partida", dateEnd: "Retorno", dateRange: (s, e) => `${s} – ${e}`,
    tutorialSteps: [
      { emoji: "📅", title: "Criar um Evento", desc: "Adicione viagens, visitas ou saídas como \"Eventos\".", hint: "Toque em \"+ Evento\" para começar!" },
      { emoji: "🎒", title: "Adicionar Itens", desc: "Para cada item, defina quantidade, dia e como preparar.", hint: "Use a aba \"Adicionar\"" },
      { emoji: "✅", title: "Marque ao Preparar", desc: "Toque para marcar. Uma barra de progresso mostra seu avanço.", hint: "Marcar → cinza → resetar para reutilizar" },
      { emoji: "🏷️", title: "Tags, cópia e reutilização", desc: "Organize com categorias e tags personalizadas. Viagem parecida? Toque em 📋 para duplicar — só mude o título e as datas!", hint: "📋 Copiar → editar título & datas → pronto" },
    ],
  },
  es: {
    appSub: "PACK SMART", appTitle: "Cero Olvidos",
    tabs: ["Eventos", "Lista", "Ajustes"],
    addEvent: "+ Evento", addItem: "+ Agregar", newEvent: "Nuevo Evento",
    eventName: "Nombre del Evento", eventNamePlaceholder: "ej: Vacaciones de verano",
    periodic: "Recurrente", oneTime: "Único", cancel: "Cancelar", create: "Crear", save: "Guardar",
    deleteEvent: "🗑 Eliminar este evento", editEvent: "Editar Evento", copySuffix: " (Copia)", viewItems: "Ver la lista", copyEvent: "📋 Duplicar este evento", copyEventTitle: "Duplicar evento", copyEventConfirm: "Duplicar y crear",
    items: "artículos", done: "hecho", noItems: "Sin artículos aún",
    noItemsHint: "Toca + para agregar artículos",
    storageFull: "Almacenamiento lleno. Elimina algunos eventos.", nameRequired: "Por favor, ingresa un nombre de evento", itemNameRequired: "Por favor, ingresa un nombre de artículo", qtyRequired: "Por favor, establece la cantidad en al menos 1", sortDay: "Por día", sortPrep: "Por preparación", sortName: "Por nombre", sortQtyDesc: "Mayor cant.", sortQtyAsc: "Menor cant.", sortCustom: "Reordenar", sortDone: "Listo",
    prepAll: "Prep: Todos", addTo: (name) => `Agregar a: ${name}`,
    itemName: "Nombre del Artículo", itemNamePlaceholder: "ej: Cargador, Ropa, Pasaporte",
    qty: "Cantidad", qtyUnit: "", days: "¿Qué día(s)? (múltiple OK)", daysUnit: "",
    resetDays: "Resetear", prepMethod: "Cómo preparar",
    prepMethods: ["Ya tengo", "Comprar", "Alquilar", "Otro"],
    whereLabel: "¿Dónde comprar?", prepOtherLabel: "Detalles (opcional)", customPrepLabel: "Agregar método", customPrepPlaceholder: "ej: Comprar localmente", wherePlaceholder: "ej: Farmacia, Supermercado",
    category: "Categoría", categories: ["Ropa", "Documentos", "Electrónica", "Higiene", "Comida", "Otro"],
    tags: "Etiquetas personalizadas (multi OK)", addToList: "✓ Agregar a la Lista",
    settings: "Ajustes", useCat: "Usar categorías", useCatDesc: "Desactivar para ocultar categorías",
    manageTags: "Gestionar Etiquetas", manageTagsDesc: "Crea tus propias etiquetas",
    resetChecks: "Usar de nuevo (resetear)", noTags: "Sin etiquetas aún",
    newTag: "Nombre de nueva etiqueta", addTag: "Agregar", editItem: "Editar Artículo", deleteItem: "🗑 Eliminar",
    language: "Idioma", selectEvent: "Seleccionar evento",
    selectEventHint: "Elige un evento en la pestaña \"Eventos\"",
    sampleModalTitle: "¿Agregar datos de ejemplo?",
    sampleModalDesc: "Agrega un viaje de ejemplo para explorar la app. Puedes eliminarlo cuando quieras.",
    sampleModalYes: "✨ Agregar", sampleModalNo: "Empezar vacío",
    langSelectTitle: "Elige tu idioma", langSelectBtn: "Siguiente →",
    resetLang: "Cambiar idioma y restablecer ejemplo",
    tutorialReplayTitle: "Ver tutorial de nuevo", tutorialReplayDesc: "Repasa cómo usar la app",
    tutorialSkip: "Omitir", tutorialNext: "Siguiente", tutorialStart: "Empezar",
    dateStart: "Salida", dateEnd: "Regreso", dateRange: (s, e) => `${s} – ${e}`,
    tutorialSteps: [
      { emoji: "📅", title: "Crear un Evento", desc: "Agrega viajes, visitas o salidas como \"Eventos\".", hint: "¡Toca \"+ Evento\" para comenzar!" },
      { emoji: "🎒", title: "Agregar Artículos", desc: "Para cada artículo, define cantidad, día y cómo prepararlo.", hint: "Usa la pestaña \"Agregar\"" },
      { emoji: "✅", title: "Marca al Preparar", desc: "Toca para marcar. Una barra de progreso muestra tu avance.", hint: "Marcar → gris → resetear para reutilizar" },
      { emoji: "🏷️", title: "Tags, copia y reutilización", desc: "Organiza con categorías y etiquetas propias. ¿Viaje similar? Toca 📋 para duplicar cualquier evento — ¡solo cambia el título y las fechas!", hint: "📋 Copiar → editar título & fechas → listo" },
    ],
  },
  zh: {
    appSub: "PACK SMART", appTitle: "不再忘东西",
    tabs: ["活动", "清单", "设置"],
    addEvent: "＋ 活动", addItem: "＋ 添加", newEvent: "新活动",
    eventName: "活动名称", eventNamePlaceholder: "例：暑假旅行",
    periodic: "定期", oneTime: "单次", cancel: "取消", create: "创建", save: "保存",
    deleteEvent: "🗑 删除此活动", editEvent: "编辑活动", copySuffix: "（副本）", viewItems: "查看清单", copyEvent: "📋 复制此活动", copyEventTitle: "复制并新建", copyEventConfirm: "复制并创建",
    items: "件物品", done: "已完成", noItems: "还没有物品",
    noItemsHint: "点击＋按钮添加物品",
    storageFull: "存储空间不足，请删除一些活动。", nameRequired: "请输入活动名称", itemNameRequired: "请输入物品名称", qtyRequired: "请将数量设置为至少1", sortDay: "按日期", sortPrep: "按准备方式", sortName: "按名称", sortQtyDesc: "数量多→少", sortQtyAsc: "数量少→多", sortCustom: "手动排序", sortDone: "完成",
    prepAll: "准备方式: 全部", addTo: (name) => `添加到：${name}`,
    itemName: "物品名称", itemNamePlaceholder: "例：充电器、衣服、护照",
    qty: "数量", qtyUnit: "个", days: "第几天使用？（可多选）", daysUnit: "天",
    resetDays: "重置", prepMethod: "准备方式",
    prepMethods: ["已有", "购买", "租借", "其他"],
    whereLabel: "在哪里买？", prepOtherLabel: "详情（可选）", customPrepLabel: "添加准备方式", customPrepPlaceholder: "例：当地购买", wherePlaceholder: "例：超市、药店",
    category: "分类", categories: ["服装", "证件", "电子产品", "日用品", "食品", "其他"],
    tags: "自定义标签（可多选）", addToList: "✓ 添加到清单",
    settings: "设置", useCat: "使用分类功能", useCatDesc: "关闭后隐藏分类",
    manageTags: "管理自定义标签", manageTagsDesc: "创建自己的分组标签",
    resetChecks: "再次使用（重置勾选）", noTags: "还没有标签",
    newTag: "新标签名称", addTag: "添加", editItem: "编辑物品", deleteItem: "🗑 删除",
    language: "语言", selectEvent: "选择活动",
    selectEventHint: "请在「活动」标签页选择一个活动",
    sampleModalTitle: "添加示例数据？",
    sampleModalDesc: "添加一个示例旅行来探索应用。随时可以删除。",
    sampleModalYes: "✨ 添加", sampleModalNo: "从空白开始",
    langSelectTitle: "请选择语言", langSelectBtn: "下一步 →",
    resetLang: "重新选择语言并重置示例",
    tutorialReplayTitle: "再次查看使用说明", tutorialReplayDesc: "重新了解应用的基本使用方法",
    tutorialSkip: "跳过", tutorialNext: "下一步", tutorialStart: "开始使用",
    dateStart: "出发", dateEnd: "返回", dateRange: (s, e) => `${s} – ${e}`,
    tutorialSteps: [
      { emoji: "📅", title: "创建活动", desc: "将旅行、拜访或外出添加为「活动」。支持定期和单次活动。", hint: "点击「＋活动」开始！" },
      { emoji: "🎒", title: "添加物品", desc: "为每件物品设置数量、使用日期和准备方式。一目了然。", hint: "在「添加」标签页登记物品" },
      { emoji: "✅", title: "准备时打勾", desc: "点击打勾。进度条显示整体进度。定期活动可重置后反复使用。", hint: "打勾→变灰→重置后再用" },
      { emoji: "🏷️", title: "标签、复制与复用", desc: "用分类和自定义标签整理物品。类似的旅行？点📋一键复制活动，只需修改标题和日期即可复用！", hint: "📋复制 → 修改标题和日期 → 完成" },
    ],
  },
  ko: {
    appSub: "PACK SMART", appTitle: "빠짐없이 챙기기",
    tabs: ["이벤트", "목록", "설정"],
    addEvent: "＋ 이벤트", addItem: "＋ 추가", newEvent: "새 이벤트",
    eventName: "이벤트 이름", eventNamePlaceholder: "예: 여름 휴가",
    periodic: "정기", oneTime: "단발", cancel: "취소", create: "만들기", save: "저장",
    deleteEvent: "🗑 이 이벤트 삭제", editEvent: "이벤트 편집", copySuffix: " (복사본)", viewItems: "짐 목록 보기", copyEvent: "📋 이 이벤트 복사", copyEventTitle: "복사하여 새로 만들기", copyEventConfirm: "복사하여 만들기",
    items: "개 아이템", done: "완료", noItems: "아이템이 없습니다",
    noItemsHint: "+ 버튼을 탭하여 추가하세요",
    storageFull: "저장 공간이 부족합니다. 이벤트를 삭제해 주세요.", nameRequired: "이벤트 이름을 입력해 주세요", itemNameRequired: "아이템 이름을 입력해 주세요", qtyRequired: "수량을 1 이상으로 설정해 주세요", sortDay: "날짜순", sortPrep: "준비방법순", sortName: "이름순", sortQtyDesc: "수량많은순", sortQtyAsc: "수량적은순", sortCustom: "순서변경", sortDone: "완료",
    prepAll: "준비: 전체", addTo: (name) => `${name}에 추가`,
    itemName: "아이템 이름", itemNamePlaceholder: "예: 충전기, 옷, 여권",
    qty: "수량", qtyUnit: "개", days: "몇 번째 날？（복수 선택 가능）", daysUnit: "일차",
    resetDays: "초기화", prepMethod: "준비 방법",
    prepMethods: ["이미 있음", "구매", "렌탈", "기타"],
    whereLabel: "어디서 살까요?", prepOtherLabel: "세부사항 (선택)", customPrepLabel: "준비방법 추가", customPrepPlaceholder: "예: 현지 구매", wherePlaceholder: "예: 편의점, 마트",
    category: "카테고리", categories: ["의류", "서류", "전자기기", "생활용품", "식품", "기타"],
    tags: "커스텀 태그 (복수 선택 가능)", addToList: "✓ 목록에 추가",
    settings: "설정", useCat: "카테고리 기능 사용", useCatDesc: "끄면 카테고리가 숨겨집니다",
    manageTags: "커스텀 태그 관리", manageTagsDesc: "나만의 그룹 태그를 만들 수 있습니다",
    resetChecks: "다시 사용 (체크 초기화)", noTags: "태그가 아직 없습니다",
    newTag: "새 태그 이름", addTag: "추가", editItem: "아이템 편집", deleteItem: "🗑 삭제",
    language: "언어", selectEvent: "이벤트를 선택하세요",
    selectEventHint: "\"이벤트\" 탭에서 이벤트를 선택하세요",
    sampleModalTitle: "샘플 데이터를 추가할까요?",
    sampleModalDesc: "샘플 여행을 추가해서 앱을 탐색해보세요. 언제든지 삭제할 수 있습니다.",
    sampleModalYes: "✨ 추가하기", sampleModalNo: "빈 상태로 시작",
    langSelectTitle: "언어를 선택하세요", langSelectBtn: "다음 →",
    resetLang: "언어 변경 및 샘플 초기화",
    tutorialReplayTitle: "사용 방법 다시 보기", tutorialReplayDesc: "앱의 기본 사용법을 다시 확인할 수 있습니다",
    tutorialSkip: "건너뛰기", tutorialNext: "다음", tutorialStart: "시작하기",
    dateStart: "출발일", dateEnd: "귀국일", dateRange: (s, e) => `${s} – ${e}`,
    tutorialSteps: [
      { emoji: "📅", title: "이벤트 만들기", desc: "여행, 방문, 외출 등을 「이벤트」로 등록하세요.", hint: "「＋이벤트」를 탭하여 시작!" },
      { emoji: "🎒", title: "아이템 추가하기", desc: "각 아이템에 개수, 사용일, 준비 방법을 설정하세요.", hint: "「추가」탭에서 아이템을 등록" },
      { emoji: "✅", title: "준비하면서 체크", desc: "탭하여 체크! 진행바로 전체 진행 상황을 확인.", hint: "체크→회색→리셋 후 재사용" },
      { emoji: "🏷️", title: "태그, 복사 & 재사용", desc: "카테고리와 나만의 태그로 짐을 정리하세요. 비슷한 여행이라면 📋로 이벤트를 통째로 복사! 제목과 날짜만 바꾸면 바로 재사용할 수 있어요.", hint: "📋 복사 → 제목·날짜 수정 → 완성" },
    ],
  },
};

const LANG_OPTIONS = [
  { code: "ja", label: "🇯🇵 日本語" },
  { code: "en", label: "🇺🇸 English" },
  { code: "fr", label: "🇫🇷 Français" },
  { code: "pt", label: "🇧🇷 Português" },
  { code: "es", label: "🇪🇸 Español" },
  { code: "zh", label: "🇨🇳 中文" },
  { code: "ko", label: "🇰🇷 한국어" },
];

const DAY_NUMS = [1,2,3,4,5,6,7,8,9,10,11,12,13,14];
const QTY_NUMS = [1,2,3,4,5,6,7,8,9,10,15,20,30,50,100];
const PREP_KEYS = ["have", "buy", "rent", "other"];
const prepColor = (p, customPreps) => {
  if (p === "have") return "#4ade80";
  if (p === "buy") return "#fb923c";
  if (p === "rent") return "#c084fc";
  if (p === "other") return "#94a3b8";
  // custom prep method
  if (customPreps && customPreps.includes(p)) return "#60a5fa";
  return "#94a3b8";
};
const PREP_LEGACY_MAP = {
  "家にある":"have","Have it":"have","J'ai déjà":"have","Já tenho":"have","Ya tengo":"have","已有":"have","이미 있음":"have",
  "買う":"buy","Buy it":"buy","Acheter":"buy","Comprar":"buy","购买":"buy","구매":"buy",
  "レンタル":"rent","Rent it":"rent","Louer":"rent","Alugar":"rent","Alquilar":"rent","租借":"rent","렌탈":"rent",
};
const normPrep = (p, customPreps) => {
  if (PREP_KEYS.includes(p)) return p;
  if (customPreps && customPreps.includes(p)) return p;
  return PREP_LEGACY_MAP[p] || "have";
};
const prepLabel = (p, t, customPreps) => {
  const idx = PREP_KEYS.indexOf(p);
  if (idx >= 0) return t.prepMethods[idx] || p;
  if (customPreps && customPreps.includes(p)) return p;
  const legacyKey = PREP_LEGACY_MAP[p];
  if (legacyKey) { const i2 = PREP_KEYS.indexOf(legacyKey); return t.prepMethods[i2] || p; }
  return p;
};

const makeSample = (lang) => {
  const p = TRANSLATIONS[lang].prepMethods;
  const c = TRANSLATIONS[lang].categories;
  const fmtLocal = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  const base = new Date();
  base.setDate(base.getDate() + 7);
  const startDate = fmtLocal(base);
  const end = new Date(base); end.setDate(base.getDate() + 4);
  const endDate = fmtLocal(end);
  const itemSets = {
    ja: [
      { id:1,  name:"Tシャツ", qty:4, days:[1,2,3,4,5], prep:"have", prepWhere:"", category:c[0], tags:[], done:false },
      { id:2,  name:"ズボン / ショーツ", qty:2, days:[1,3,5], prep:"have", prepWhere:"", category:c[0], tags:[], done:false },
      { id:3,  name:"パジャマ", qty:1, days:[1,2,3,4], prep:"have", prepWhere:"", category:c[0], tags:[], done:false },
      { id:4,  name:"下着", qty:5, days:[1,2,3,4,5], prep:"have", prepWhere:"", category:c[0], tags:[], done:false },
      { id:5,  name:"靴下", qty:5, days:[1,2,3,4,5], prep:"have", prepWhere:"", category:c[0], tags:[], done:false },
      { id:6,  name:"羽織り / パーカー", qty:1, days:[1,5], prep:"have", prepWhere:"", category:c[0], tags:[], done:false },
      { id:7,  name:"パスポート", qty:1, days:[1,5], prep:"have", prepWhere:"", category:c[1], tags:[], done:false },
      { id:8,  name:"航空券（印刷 or スマホ）", qty:1, days:[1,5], prep:"have", prepWhere:"", category:c[1], tags:[], done:false },
      { id:9,  name:"ホテル予約確認書", qty:1, days:[1], prep:"have", prepWhere:"", category:c[1], tags:[], done:false },
      { id:10, name:"海外旅行保険証", qty:1, days:[1], prep:"buy", prepWhere:"ネット申込み", category:c[1], tags:[], done:false },
      { id:11, name:"スマートフォン", qty:1, days:[1,2,3,4,5], prep:"have", prepWhere:"", category:c[2], tags:[], done:false },
      { id:12, name:"充電器（USB-C）", qty:1, days:[1], prep:"have", prepWhere:"", category:c[2], tags:[], done:false },
      { id:13, name:"モバイルバッテリー", qty:1, days:[1,2,3,4,5], prep:"have", prepWhere:"", category:c[2], tags:[], done:false },
      { id:14, name:"変換プラグ", qty:1, days:[1], prep:"buy", prepWhere:"家電量販店", category:c[2], tags:[], done:false },
      { id:15, name:"イヤホン", qty:1, days:[1,2,3,4,5], prep:"have", prepWhere:"", category:c[2], tags:[], done:false },
      { id:16, name:"歯ブラシ・歯磨き粉", qty:1, days:[1,2,3,4,5], prep:"have", prepWhere:"", category:c[3], tags:[], done:false },
      { id:17, name:"シャンプー", qty:1, days:[1,2,3,4], prep:"buy", prepWhere:"ドラッグストア", category:c[3], tags:[], done:false },
      { id:18, name:"洗顔料・化粧水", qty:1, days:[1,2,3,4,5], prep:"have", prepWhere:"", category:c[3], tags:[], done:false },
      { id:19, name:"コンタクトレンズ（1日用×5）", qty:5, days:[1,2,3,4,5], prep:"buy", prepWhere:"ドラッグストア", category:c[3], tags:[], done:false },
      { id:20, name:"コンタクト洗浄液", qty:1, days:[1,2,3,4,5], prep:"buy", prepWhere:"ドラッグストア", category:c[3], tags:[], done:false },
      { id:21, name:"日焼け止め", qty:1, days:[2,3,4], prep:"buy", prepWhere:"ドラッグストア", category:c[3], tags:[], done:false },
      { id:22, name:"常備薬（頭痛・胃薬）", qty:1, days:[1,2,3,4,5], prep:"buy", prepWhere:"ドラッグストア", category:c[3], tags:[], done:false },
      { id:23, name:"エコバッグ", qty:1, days:[2,3,4], prep:"have", prepWhere:"", category:c[3], tags:[], done:false },
      { id:24, name:"現地通貨（両替）", qty:1, days:[1], prep:"buy", prepWhere:"空港両替所", category:c[5], tags:[], done:false },
      { id:25, name:"折りたたみ傘", qty:1, days:[1,2,3,4,5], prep:"have", prepWhere:"", category:c[5], tags:[], done:false },
      { id:26, name:"南京錠", qty:1, days:[1], prep:"have", prepWhere:"", category:c[5], tags:[], done:false },
    ],
    en: [
      { id:1, name:"T-shirts", qty:4, days:[1,2,3,4,5], prep:"have", prepWhere:"", category:c[0], tags:[], done:false },
      { id:2, name:"Shorts / Pants", qty:2, days:[1,3,5], prep:"have", prepWhere:"", category:c[0], tags:[], done:false },
      { id:3, name:"Pajamas", qty:1, days:[1,2,3,4], prep:"have", prepWhere:"", category:c[0], tags:[], done:false },
      { id:4, name:"Underwear", qty:5, days:[1,2,3,4,5], prep:"have", prepWhere:"", category:c[0], tags:[], done:false },
      { id:5, name:"Socks", qty:5, days:[1,2,3,4,5], prep:"have", prepWhere:"", category:c[0], tags:[], done:false },
      { id:6, name:"Light jacket / hoodie", qty:1, days:[1,5], prep:"have", prepWhere:"", category:c[0], tags:[], done:false },
      { id:7, name:"Passport", qty:1, days:[1,5], prep:"have", prepWhere:"", category:c[1], tags:[], done:false },
      { id:8, name:"Flight tickets (print/phone)", qty:1, days:[1,5], prep:"have", prepWhere:"", category:c[1], tags:[], done:false },
      { id:9, name:"Hotel confirmation", qty:1, days:[1], prep:"have", prepWhere:"", category:c[1], tags:[], done:false },
      { id:10, name:"Travel insurance", qty:1, days:[1], prep:"buy", prepWhere:"Online", category:c[1], tags:[], done:false },
      { id:11, name:"Smartphone", qty:1, days:[1,2,3,4,5], prep:"have", prepWhere:"", category:c[2], tags:[], done:false },
      { id:12, name:"Charger (USB-C)", qty:1, days:[1], prep:"have", prepWhere:"", category:c[2], tags:[], done:false },
      { id:13, name:"Power bank", qty:1, days:[1,2,3,4,5], prep:"have", prepWhere:"", category:c[2], tags:[], done:false },
      { id:14, name:"Travel adapter", qty:1, days:[1], prep:"buy", prepWhere:"Electronics store", category:c[2], tags:[], done:false },
      { id:15, name:"Earphones", qty:1, days:[1,2,3,4,5], prep:"have", prepWhere:"", category:c[2], tags:[], done:false },
      { id:16, name:"Toothbrush & toothpaste", qty:1, days:[1,2,3,4,5], prep:"have", prepWhere:"", category:c[3], tags:[], done:false },
      { id:17, name:"Shampoo & conditioner", qty:1, days:[1,2,3,4], prep:"buy", prepWhere:"Pharmacy", category:c[3], tags:[], done:false },
      { id:18, name:"Face wash & moisturizer", qty:1, days:[1,2,3,4,5], prep:"have", prepWhere:"", category:c[3], tags:[], done:false },
      { id:19, name:"Contact lenses (x5 daily)", qty:5, days:[1,2,3,4,5], prep:"buy", prepWhere:"Pharmacy", category:c[3], tags:[], done:false },
      { id:20, name:"Contact lens solution", qty:1, days:[1,2,3,4,5], prep:"buy", prepWhere:"Pharmacy", category:c[3], tags:[], done:false },
      { id:21, name:"Sunscreen", qty:1, days:[2,3,4], prep:"buy", prepWhere:"Pharmacy", category:c[3], tags:[], done:false },
      { id:22, name:"Medicine (pain/stomach)", qty:1, days:[1,2,3,4,5], prep:"buy", prepWhere:"Pharmacy", category:c[3], tags:[], done:false },
      { id:23, name:"Reusable bag", qty:1, days:[2,3,4], prep:"have", prepWhere:"", category:c[3], tags:[], done:false },
      { id:24, name:"Local currency (exchange)", qty:1, days:[1], prep:"buy", prepWhere:"Airport exchange", category:c[5], tags:[], done:false },
      { id:25, name:"Compact umbrella", qty:1, days:[1,2,3,4,5], prep:"have", prepWhere:"", category:c[5], tags:[], done:false },
      { id:26, name:"Padlock", qty:1, days:[1], prep:"have", prepWhere:"", category:c[5], tags:[], done:false },
    ],
  };
  const langItems = (itemSets[lang] || itemSets["en"]).map(i => ({ ...i }));
  const names = { ja:"旅行", en:"Summer Trip", fr:"Voyage d'été", pt:"Viagem de Verão", es:"Viaje de Verano", zh:"暑假旅行", ko:"여름 여행" };
  const types = { ja:"単発", en:"One-time", fr:"Unique", pt:"Único", es:"Único", zh:"单次", ko:"단발" };
  return [{ id:1, name: names[lang]||"Trip", type: types[lang]||"One-time", startDate, endDate, items: langItems }];
};

const sampleEvents = Object.fromEntries(
  ["ja","en","fr","pt","es","zh","ko"].map(l => [l, makeSample(l)])
);

const inputStyle = { width:"100%", background:"#0f0f13", border:"1px solid #ffffff15", borderRadius:10, padding:"9px 12px", color:"#f0ede8", fontSize:16, marginBottom:6, boxSizing:"border-box", outline:"none" };
const selectStyle = { background:"#1e2030", border:"1px solid #ffffff10", borderRadius:20, padding:"6px 10px", color:"#aaa", fontSize:11, outline:"none", cursor:"pointer", whiteSpace:"nowrap", flexShrink:0 };
const lbl = { display:"block", fontSize:11, color:"#555", marginBottom:3, letterSpacing:1, textTransform:"uppercase" };
const pillBtn = { background:"linear-gradient(135deg,#2563eb,#3b82f6)", border:"none", borderRadius:20, color:"white", padding:"8px 16px", fontSize:13, fontWeight:600, cursor:"pointer" };
const card = { background:"#1a1a26", border:"1px solid #ffffff08", borderRadius:14, padding:12, marginBottom:10 };
const emptyItem = () => ({ name:"", qty:0, days:[], prep:"have", prepWhere:"", category:"", tags:[] });

const WEEKDAYS_JA = ["日","月","火","水","木","金","土"];
const WEEKDAYS_EN = ["Su","Mo","Tu","We","Th","Fr","Sa"];
const DateRangePicker = ({ startDate, endDate, onChangeRange, t, lang }) => {
  const todayStr = (() => {
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  })();
  const initYear = startDate ? parseInt(startDate.slice(0,4)) : parseInt(todayStr.slice(0,4));
  const initMonth = startDate ? parseInt(startDate.slice(5,7))-1 : parseInt(todayStr.slice(5,7))-1;
  const [viewDate, setViewDate] = useState({ year: initYear, month: initMonth });

  useEffect(() => {
    if (startDate) {
      setViewDate({ year: parseInt(startDate.slice(0,4)), month: parseInt(startDate.slice(5,7))-1 });
    }
  }, [startDate]);
  const viewYear = viewDate.year;
  const viewMonth = viewDate.month;
  const [selecting, setSelecting] = useState("start");
  const fmt = (d) => `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")}`;
  const monthLabel = () => {
    const names = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    if (lang === "ja" || lang === "zh") return `${viewYear}年${viewMonth+1}月`;
    if (lang === "ko") return `${viewYear}년 ${viewMonth+1}월`;
    return `${names[viewMonth]} ${viewYear}`;
  };
  const prevMonth = () => setViewDate(({ year, month }) => month === 0 ? { year: year-1, month: 11 } : { year, month: month-1 });
  const nextMonth = () => setViewDate(({ year, month }) => month === 11 ? { year: year+1, month: 0 } : { year, month: month+1 });
  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth+1, 0).getDate();
  const cells = [];
  for (let i=0;i<firstDay;i++) cells.push(null);
  for (let d=1;d<=daysInMonth;d++) cells.push(d);
  const handleDay = (d) => {
    if (!d) return;
    const clicked = fmt(new Date(viewYear, viewMonth, d));
    if (selecting === "start") {
      onChangeRange(clicked, endDate && clicked > endDate ? "" : endDate);
      setSelecting("end");
    } else {
      if (startDate && clicked < startDate) {
        onChangeRange(clicked, "");
        setSelecting("end");
      } else {
        onChangeRange(startDate, clicked);
        setSelecting("start");
      }
    }
  };
  const cellStr = (d) => d ? `${viewYear}-${String(viewMonth+1).padStart(2,"0")}-${String(d).padStart(2,"0")}` : "";
  const isStart = (d) => !!d && cellStr(d) === startDate;
  const isEnd = (d) => !!d && cellStr(d) === endDate;
  const inRange = (d) => { if (!d || !startDate || !endDate) return false; const s = cellStr(d); return s > startDate && s < endDate; };
  const isPast = (d) => { if (!d) return false; const s = cellStr(d); if (s === startDate || s === endDate) return false; return s < todayStr; };
  const fmtDisplay = (s) => {
    if (!s) return "—";
    const mo = parseInt(s.slice(5,7))-1, dy = parseInt(s.slice(8,10));
    if (lang==="ja"||lang==="zh") return `${mo+1}月${dy}日`;
    if (lang==="ko") return `${mo+1}월 ${dy}일`;
    const names=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];
    return `${names[mo]} ${dy}`;
  };
  const wdays = (lang==="ja"||lang==="zh"||lang==="ko") ? WEEKDAYS_JA : WEEKDAYS_EN;
  return (
    <div style={{ background:"#0f0f13", border:"1px solid #ffffff15", borderRadius:14, padding:"14px 12px", marginBottom:8 }}>
      <div style={{ display:"flex", gap:8, marginBottom:14 }}>
        {["start","end"].map(mode => {
          const isActive = selecting===mode;
          const label = mode==="start" ? t.dateStart : t.dateEnd;
          const val = mode==="start" ? fmtDisplay(startDate) : fmtDisplay(endDate);
          return (
            <button key={mode} onClick={() => setSelecting(mode)} style={{ flex:1, padding:"10px 8px", borderRadius:10, border: isActive?"2px solid #3b82f6":"2px solid #ffffff10", background: isActive?"#1a2a40":"#1a1a26", cursor:"pointer", textAlign:"left" }}>
              <div style={{ fontSize:9, color: isActive?"#60a5fa":"#555", letterSpacing:1, textTransform:"uppercase", marginBottom:3 }}>{label}</div>
              <div style={{ fontSize:15, fontWeight:700, color: val==="—"?"#444":"#f0ede8" }}>{val}</div>
            </button>
          );
        })}
      </div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:10 }}>
        <button onClick={prevMonth} style={{ background:"none", border:"none", color:"#60a5fa", fontSize:18, cursor:"pointer", padding:"0 8px" }}>‹</button>
        <div style={{ fontSize:14, fontWeight:700, color:"#f0ede8" }}>{monthLabel()}</div>
        <button onClick={nextMonth} style={{ background:"none", border:"none", color:"#60a5fa", fontSize:18, cursor:"pointer", padding:"0 8px" }}>›</button>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", marginBottom:4 }}>
        {wdays.map((w,i) => <div key={i} style={{ textAlign:"center", fontSize:10, color: i===0?"#f87171":i===6?"#60a5fa":"#555", paddingBottom:4 }}>{w}</div>)}
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"repeat(7,1fr)", gap:"2px 0" }}>
        {cells.map((d,i) => {
          const start = isStart(d), end = isEnd(d), range = inRange(d), past = isPast(d);
          const isEdge = start||end;
          return (
            <div key={i} style={{ position:"relative", display:"flex", alignItems:"center", justifyContent:"center" }}>
              {(range||(start&&endDate)||(end&&startDate)) && d && (
                <div style={{ position:"absolute", top:2, bottom:2, left: start ? "50%" : "0", right: end ? "50%" : "0", background:"#1d4ed840" }} />
              )}
              <button onClick={() => handleDay(d)} disabled={!d||past} style={{ position:"relative", zIndex:1, width:34, height:34, borderRadius:"50%", border:"none", background: isEdge ? "#3b82f6" : "transparent", color: !d ? "transparent" : past ? "#333" : isEdge ? "white" : "#f0ede8", fontSize:13, fontWeight: isEdge?700:400, cursor: !d||past ? "default" : "pointer" }}>{d||""}</button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const TutorialScreen = ({ lang, onFinish, onSkip }) => {
  const [step, setStep] = useState(0);
  const [animating, setAnimating] = useState(false);
  const t = TRANSLATIONS[lang] || TRANSLATIONS["en"];
  const steps = t.tutorialSteps;
  const total = steps.length;
  const current = steps[step];
  const isLast = step === total - 1;
  const stepColors = ["#3b82f6","#f59e0b","#22c55e","#a855f7"];
  const color = stepColors[step % stepColors.length];
  const goNext = () => {
    if (animating) return;
    if (isLast) { onFinish(); return; }
    setAnimating(true);
    setTimeout(() => { setStep(s => s + 1); setAnimating(false); }, 180);
  };
  return (
    <div style={{ background:"#0f0f13", minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"32px 24px", fontFamily: lang==="ja"||lang==="zh"||lang==="ko" ? "'Hiragino Sans','Noto Sans JP',sans-serif" : "system-ui,sans-serif", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:"20%", left:"50%", transform:"translateX(-50%)", width:320, height:320, borderRadius:"50%", background:color, opacity:0.06, filter:"blur(80px)", transition:"background 0.5s", pointerEvents:"none" }} />
      <button onClick={onSkip} style={{ position:"absolute", top:20, right:20, background:"none", border:"1px solid #ffffff15", borderRadius:20, color:"#555", fontSize:12, padding:"6px 14px", cursor:"pointer" }}>{t.tutorialSkip}</button>
      <div style={{ display:"flex", gap:8, marginBottom:40 }}>
        {steps.map((_, i) => <div key={i} style={{ width:i===step?24:8, height:8, borderRadius:4, background:i===step?color:"#ffffff15", transition:"all 0.3s ease" }} />)}
      </div>
      <div style={{ width:"100%", maxWidth:340, background:"#1a1a26", borderRadius:24, padding:"36px 28px 32px", textAlign:"center", opacity:animating?0:1, transform:animating?"translateY(8px)":"translateY(0)", transition:"opacity 0.18s ease, transform 0.18s ease" }}>
        <div style={{ fontSize:64, marginBottom:20, lineHeight:1 }}>{current.emoji}</div>
        <div style={{ fontSize:10, letterSpacing:3, textTransform:"uppercase", color, fontWeight:700, marginBottom:10 }}>{step+1} / {total}</div>
        <div style={{ fontSize:22, fontWeight:800, color:"#f0ede8", marginBottom:14, lineHeight:1.3 }}>{current.title}</div>
        <div style={{ fontSize:14, color:"rgba(255,255,255,0.55)", lineHeight:1.75, marginBottom:20 }}>{current.desc}</div>
        <div style={{ display:"inline-block", background:color+"18", borderRadius:20, padding:"7px 16px", fontSize:12, color, fontWeight:600 }}>💡 {current.hint}</div>
      </div>
      <button onClick={goNext} style={{ marginTop:28, width:"100%", maxWidth:340, padding:"17px 0", borderRadius:40, background:"linear-gradient(135deg,"+color+","+color+"bb)", color:"white", fontSize:16, fontWeight:700, border:"none", cursor:"pointer" }}>
        {isLast ? t.tutorialStart : t.tutorialNext + " →"}
      </button>
    </div>
  );
};

const QTY_SINGLE = [1,2,3,4,5,6,7,8,9];
const QTY_PRESET = [10,15,20,30,50,100];
const QtyPad = ({ value, setter, t }) => {
  const [directInput, setDirectInput] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const pressSingle = (n) => {
    setter(p => {
      const base = p.qty === 0 ? "" : String(p.qty);
      const next = Math.min(9999, parseInt(base + String(n), 10) || n);
      return { ...p, qty: next };
    });
  };
  const pressPreset = (n) => setter(p => ({ ...p, qty: n }));
  const backspace = () => {
    setter(p => {
      const str = String(p.qty).slice(0, -1);
      return { ...p, qty: str.length ? Math.max(1, parseInt(str, 10)) : 0 };
    });
  };
  const commitDirect = (v) => {
    const n = parseInt(v, 10);
    if (!isNaN(n) && n >= 0) setter(p => ({ ...p, qty: Math.min(9999, n) }));
    setDirectInput(false);
    setInputVal("");
  };
  return (
    <div>
      {directInput ? (
        <input autoFocus type="text" inputMode="decimal" pattern="[0-9]*" value={inputVal}
          onChange={e => setInputVal(e.target.value)}
          onBlur={() => commitDirect(inputVal)}
          onKeyDown={e => { if (e.key==="Enter") commitDirect(inputVal); if (e.key==="Escape") setDirectInput(false); }}
          style={{ ...inputStyle, marginBottom:8, fontSize:28, fontWeight:700, textAlign:"right", background:"#1e2030", border:"2px solid #3b82f6", borderRadius:12, padding:"10px 14px" }}
        />
      ) : (
        <div onClick={() => { setDirectInput(true); setInputVal(value > 0 ? String(value) : ""); }}
          style={{ background:"#1e2030", borderRadius:8, padding:"5px 10px", marginBottom:4, fontSize:20, fontWeight:700, color:"#f0ede8", textAlign:"right", cursor:"text", display:"flex", justifyContent:"space-between", alignItems:"center" }}>
          <span style={{ fontSize:10, color:"#3b82f6", letterSpacing:1 }}>✎</span>
          <span>{value || "0"}<span style={{ fontSize:13, color:"#555", marginLeft:6 }}>{t.qtyUnit}</span></span>
        </div>
      )}
      <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:6 }}>
        {QTY_SINGLE.map(n => (
          <button key={n} onClick={() => pressSingle(n)} style={{ minWidth:32, height:32, borderRadius:8, border:"none", padding:"0 4px", background:"#1e2030", color:"#ccc", fontSize:13, fontWeight:600, cursor:"pointer" }}>{n}</button>
        ))}
        <button onClick={backspace} style={{ minWidth:32, height:32, borderRadius:8, border:"none", padding:"0 8px", background:"#2a1a1a", color:"#f87171", fontSize:12, fontWeight:700, cursor:"pointer" }}>⌫</button>
        <button onClick={() => pressSingle(0)} style={{ minWidth:32, height:32, borderRadius:8, border:"none", padding:"0 4px", background:"#1e2030", color:"#ccc", fontSize:13, fontWeight:600, cursor:"pointer" }}>0</button>
        <button onClick={() => setter(p => ({ ...p, qty: 0 }))} style={{ minWidth:32, height:32, borderRadius:8, border:"none", padding:"0 8px", background:"#1a1a26", color:"#555", fontSize:10, cursor:"pointer" }}>C</button>
      </div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
        {QTY_PRESET.map(n => (
          <button key={n} onClick={() => pressPreset(n)} style={{ minWidth:32, height:32, borderRadius:8, border:"none", padding:"0 6px", background:"#252840", color:"#888", fontSize:12, fontWeight:600, cursor:"pointer" }}>{n}</button>
        ))}
      </div>
    </div>
  );
};

const ItemForm = ({ item, setter, onSave, onCancel, onDelete, t, useCat, userTags, customPreps, toggleDay, daysLabel, maxDay, error }) => {
  const availableDays = DAY_NUMS.filter(d => d <= (maxDay || DAY_NUMS.length));
  const baseField = { borderRadius:8, padding:"4px 8px", marginBottom:5, border:"1px solid #ffffff15", transition:"border 0.15s, box-shadow 0.15s" };
  const errorRef = React.useRef(null);
  React.useEffect(() => {
    if (error && errorRef.current) errorRef.current.scrollIntoView({ behavior:"smooth", block:"center" });
  }, [error]);
  const allPrepKeys = [...PREP_KEYS, ...(customPreps || [])];
  const allPrepLabels = [...t.prepMethods, ...(customPreps || [])];
  return (
    <div>
      <div className="ps-field" style={{ ...baseField }}>
        <div style={{ ...lbl }}>{t.itemName}</div>
        <input value={item.name} onChange={e => setter(p => ({ ...p, name: e.target.value }))} placeholder={t.itemNamePlaceholder}
          style={{ ...inputStyle, marginBottom:0, background:"transparent", border:"none", padding:"0", fontSize:16 }} />
      </div>
      {error && <div ref={errorRef} style={{ color:"#f87171", fontSize:13, marginTop:-6, marginBottom:8, padding:"8px 12px", background:"#3a1a1a", borderRadius:8 }}>⚠ {error}</div>}
      <div className="ps-field" style={{ ...baseField }}>
        <div style={{ ...lbl }}>{t.qty}</div>
        <QtyPad value={item.qty} setter={setter} t={t} />
      </div>
      <div style={lbl}>{t.days} {item.days.length>0 && <span style={{ color:"#60a5fa" }}>{daysLabel(item.days)}</span>}</div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:6 }}>
        {availableDays.map(d => <button key={d} onClick={() => toggleDay(d, setter)} style={{ width:32, height:32, borderRadius:8, border:"none", background:item.days.includes(d)?"#3b82f6":"#1e2030", color:item.days.includes(d)?"white":"#666", fontSize:12, fontWeight:item.days.includes(d)?700:400, cursor:"pointer" }}>{d}</button>)}
      </div>
      <button onClick={() => setter(p => ({ ...p, days:[] }))} style={{ background:"none", border:"1px solid #333", borderRadius:8, color:"#555", fontSize:11, padding:"4px 12px", cursor:"pointer", marginBottom:12 }}>{t.resetDays}</button>
      <div style={lbl}>{t.prepMethod}</div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:8 }}>
        {allPrepKeys.map((key, idx) => {
          const active = item.prep === key;
          const col = prepColor(key, customPreps);
          return (
            <button key={key} onClick={() => setter(prev => ({ ...prev, prep:key, prepWhere:"" }))}
              style={{ padding:"7px 10px", borderRadius:10, border:"none", background:active?col:"#1e2030", color:active?"#000":"#888", fontSize:11, fontWeight:active?700:400, cursor:"pointer" }}>
              {allPrepLabels[idx] || key}
            </button>
          );
        })}
      </div>
      {item.prep === "buy" && (
        <div className="ps-field" style={{ ...baseField }}>
          <input placeholder={t.wherePlaceholder} value={item.prepWhere} onChange={e => setter(p => ({ ...p, prepWhere:e.target.value }))}
            style={{ ...inputStyle, marginBottom:0, background:"transparent", border:"none", padding:"4px 0" }} />
        </div>
      )}
      {(item.prep === "other" || (customPreps && customPreps.includes(item.prep))) && (
        <div className="ps-field" style={{ ...baseField, marginTop:4 }}>
          <input placeholder={t.prepOtherLabel || "詳細（任意）"} value={item.prepWhere} onChange={e => setter(p => ({ ...p, prepWhere:e.target.value }))}
            style={{ ...inputStyle, marginBottom:0, background:"transparent", border:"none", padding:"4px 0" }} />
        </div>
      )}
      {useCat && <>
        <div style={lbl}>{t.category}</div>
        <div style={{ display:"flex", gap:6, flexWrap:"wrap", marginBottom:10 }}>
          {t.categories.map(c => (
            <button key={c} onClick={() => setter(p => ({ ...p, category:p.category===c?"":c }))}
              style={{ padding:"7px 14px", borderRadius:20, border:"none", background:item.category===c?"#22c55e":"#1e2030", color:item.category===c?"white":"#888", fontSize:12, fontWeight:item.category===c?700:400, cursor:"pointer" }}>{c}</button>
          ))}
          {userTags.map(tag => (
            <button key={tag} onClick={() => setter(p => ({ ...p, category:p.category===tag?"":tag }))}
              style={{ padding:"7px 14px", borderRadius:20, border:"none", background:item.category===tag?"#7c3aed":"#1e2030", color:item.category===tag?"white":"#888", fontSize:12, fontWeight:item.category===tag?700:400, cursor:"pointer" }}>{tag}</button>
          ))}
        </div>
      </>}
      <div style={{ display:"flex", gap:8, marginBottom:onDelete?"8px":"0px" }}>
        <button onClick={onCancel} style={{ ...pillBtn, background:"#2a2d3e", flex:1 }}>{t.cancel}</button>
        <button onClick={onSave} style={{ ...pillBtn, flex:2 }}>{t.save}</button>
      </div>
      {onDelete && <button onClick={onDelete} style={{ width:"100%", padding:8, borderRadius:8, border:"none", background:"#3a1a1a", color:"#f87171", fontSize:12, fontWeight:600, cursor:"pointer" }}>{t.deleteItem}</button>}
    </div>
  );
};

const genIdGlobal = () => {
  try {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") return crypto.randomUUID();
  } catch (_) {}
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2,9)}-${Math.random().toString(36).slice(2,9)}`;
};

const safeSaveWithAlert = (key, value, alertMsg) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    if (e && (e.name === "QuotaExceededError" || e.name === "NS_ERROR_DOM_QUOTA_REACHED" || e.code === 22)) {
      alert(alertMsg || "Storage is full. Please delete some events to free up space.");
    }
  }
};

const injectGlobalStyle = () => {
  if (typeof document === "undefined") return;
  if (document.getElementById("ps-global-style")) return;
  const s = document.createElement("style");
  s.id = "ps-global-style";
  s.textContent = `
    * { -webkit-tap-highlight-color: transparent; box-sizing: border-box; }
    button:focus-visible, input:focus-visible, select:focus-visible { outline: 2px solid #3b82f6; outline-offset: 2px; }
    button:active { opacity: 0.82; }
    input, select, textarea { -webkit-appearance: none; font-size: 16px !important; }
    .ps-field:focus-within { border-color: #3b82f6 !important; box-shadow: 0 0 0 3px rgba(59,130,246,0.12) !important; }
  `;
  document.head.appendChild(s);
};

const safeLoad = (key, fallback) => {
  try { const v = localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
};
const safeSave = (key, value, alertMsg) => safeSaveWithAlert(key, value, alertMsg);
const safeCheck = (key) => {
  try { return !!localStorage.getItem(key); } catch { return false; }
};

export default function App() {
  const isFirstTime = !safeCheck("ps_onboarded");
  const [lang, setLang] = useState(() => safeLoad("ps_lang", "ja"));
  const [screen, setScreen] = useState(isFirstTime ? "lang" : "app");
  const [selectedLang, setSelectedLang] = useState(() => safeLoad("ps_lang", "ja"));
  const t = TRANSLATIONS[lang] || TRANSLATIONS["en"];
  const [events, setEvents] = useState(() => safeLoad("ps_events", []));
  const [selectedEventId, setSelectedEventId] = useState(() => safeLoad("ps_selectedId", null));
  const [tabIndex, setTabIndex] = useState(0);
  const [sortBy, setSortBy] = useState("day");
  const [filterPrep, setFilterPrep] = useState("all");
  const [isReordering, setIsReordering] = useState(false);
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newEvent, setNewEvent] = useState({ name:"", type:"periodic", startDate:"", endDate:"" });
  const [editingEvent, setEditingEvent] = useState(null);
  const [copyDraft, setCopyDraft] = useState(null);
  const [newItem, setNewItem] = useState(() => emptyItem());
  const [editingItem, setEditingItem] = useState(null);
  const [useCat, setUseCat] = useState(() => safeLoad("ps_useCat", true));
  const [userTags, setUserTags] = useState(() => safeLoad("ps_userTags", []));
  const [customPreps, setCustomPreps] = useState(() => safeLoad("ps_customPreps", []));
  const [newTagInput, setNewTagInput] = useState("");
  const [newPrepInput, setNewPrepInput] = useState("");
  const [addItemError, setAddItemError] = useState("");

  useEffect(() => { injectGlobalStyle(); }, []);
  useEffect(() => {
    const isModalOpen = showAddItem || !!copyDraft;
    document.body.style.overflow = isModalOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [showAddItem, copyDraft]);
  useEffect(() => { safeSave("ps_events", events, (TRANSLATIONS[lang]||TRANSLATIONS["en"]).storageFull); }, [events, lang]);
  useEffect(() => { safeSave("ps_selectedId", selectedEventId); }, [selectedEventId]);
  useEffect(() => { safeSave("ps_lang", lang); }, [lang]);
  useEffect(() => { safeSave("ps_useCat", useCat); }, [useCat]);
  useEffect(() => { safeSave("ps_userTags", userTags, (TRANSLATIONS[lang]||TRANSLATIONS["en"]).storageFull); }, [userTags, lang]);
  useEffect(() => { safeSave("ps_customPreps", customPreps); }, [customPreps]);

  const selectedEvent = events.find(e => e.id === selectedEventId);
  const filteredItems = useMemo(() => {
    const ev = events.find(e => e.id === selectedEventId);
    if (!ev) return [];
    let items = [...ev.items];
    if (filterPrep !== "all") items = items.filter(i => { const n = normPrep(i.prep, customPreps); return filterPrep === "other" ? (n === "other" || (customPreps && customPreps.includes(i.prep))) : n === filterPrep; });
    items.sort((a, b) =>
      sortBy==="day" ? (a.days[0]||99)-(b.days[0]||99) :
      sortBy==="prep" ? (() => {
        const order = { have:0, buy:1, rent:2, other:3 };
        const keyA = order[a.prep] !== undefined ? a.prep : "other";
        const keyB = order[b.prep] !== undefined ? b.prep : "other";
        const diff = (order[keyA]??3) - (order[keyB]??3);
        return diff !== 0 ? diff : a.prep.localeCompare(b.prep);
      })() :
      sortBy==="name" ? a.name.localeCompare(b.name) :
      sortBy==="qtyDesc" ? b.qty-a.qty :
      sortBy==="qtyAsc" ? a.qty-b.qty : 0
    );
    return items;
  }, [events, selectedEventId, sortBy, filterPrep]);

  const genId = genIdGlobal;

  const tripDays = (ev) => {
    if (!ev || isPeriodicType(ev.type) || !ev.startDate || !ev.endDate) return DAY_NUMS.length;
    const [ey,em,ed] = ev.endDate.split("-").map(Number);
    const [sy,sm,sd] = ev.startDate.split("-").map(Number);
    const diff = Math.round((new Date(ey,em-1,ed) - new Date(sy,sm-1,sd)) / 86400000) + 1;
    return Math.max(1, Math.min(diff, DAY_NUMS.length));
  };

  const addEventFn = () => {
    if (!newEvent.name.trim()) {
      setNewEvent(p => ({ ...p, _error: t.nameRequired }));
      setTimeout(() => document.getElementById("new-event-error")?.scrollIntoView({ behavior:"smooth", block:"center" }), 50);
      return;
    }
    const ev = { ...newEvent, id:genId(), items:[] };
    delete ev._error;
    setEvents(p => [...p, ev]);
    setSelectedEventId(ev.id);
    setNewEvent({ name:"", type:"periodic", startDate:"", endDate:"" });
    setShowAddEvent(false);
  };
  const saveEditEvent = () => {
    if (!editingEvent?.name.trim()) return;
    const cleanedEvent = isPeriodicType(editingEvent.type) ? { ...editingEvent, startDate: "", endDate: "" } : editingEvent;
    const maxDay = tripDays(cleanedEvent);
    setEvents(p => p.map(e => {
      if (e.id !== editingEvent.id) return e;
      const updatedItems = e.items.map(i => ({ ...i, tags: [...i.tags], days: i.days.filter(d => d <= maxDay) }));
      return { ...e, ...cleanedEvent, items: updatedItems };
    }));
    setEditingEvent(null);
  };
  const deleteEvent = (id) => {
    const remaining = events.filter(e => e.id!==id);
    setEvents(remaining);
    if (selectedEventId===id) { setSelectedEventId(remaining[0]?.id||null); setTabIndex(0); }
    setEditingEvent(null);
  };
  const updateItems = (fn) => setEvents(p => p.map(e =>
    e.id===selectedEventId ? { ...e, items: fn(e.items.map(i => ({ ...i, tags: [...i.tags] }))) } : e
  ));
  const toggleDone = (id) => updateItems(items => items.map(i => i.id===id ? { ...i, done:!i.done } : i));
  const deleteItem = (id) => updateItems(items => items.filter(i => i.id!==id));
  const addItem = () => {
    if (!newItem.name.trim()) {
      setAddItemError(t.itemNameRequired);
      setTimeout(() => document.getElementById("add-item-error")?.scrollIntoView({ behavior:"smooth", block:"center" }), 50);
      return;
    }
    if (newItem.qty === 0) {
      setAddItemError(t.qtyRequired);
      return;
    }
    setAddItemError("");
    updateItems(items => [...items, { ...newItem, tags:[...newItem.tags], id:genId(), done:false }]);
    setNewItem(emptyItem()); setShowAddItem(false);
  };
  const saveEditItem = () => {
    if (!editingItem?.name.trim()) return;
    updateItems(items => items.map(i => i.id===editingItem.id ? { ...editingItem, tags:[...editingItem.tags] } : i));
    setEditingItem(null);
  };
  const resetChecks = (eventId) => setEvents(p => p.map(e => e.id===eventId ? { ...e, items:e.items.map(i => ({ ...i, done:false })) } : e));
  const copyEvent = (ev) => {
    const baseName = ev.name.replace(/ \(\d+\)$/, "");
    setCopyDraft({ sourceItems: ev.items, name: baseName, baseName: baseName, type: ev.type, startDate: ev.startDate || "", endDate: ev.endDate || "" });
    setEditingEvent(null);
  };
  const confirmCopy = () => {
    if (!copyDraft) return;
    const maxDay = tripDays(copyDraft);
    const baseName = copyDraft.baseName || copyDraft.name.replace(/ \(\d+\)$/, "");
    const existing = events.map(e => { const m = e.name.match(/^(.+) \((\d+)\)$/); return m && m[1]===baseName ? parseInt(m[2]) : 0; }).filter(n => n > 0);
    const nextNum = existing.length > 0 ? Math.max(...existing) + 1 : 1;
    const isNameChanged = copyDraft.name !== baseName;
    const finalName = isNameChanged ? copyDraft.name.slice(0, 50) : `${baseName} (${nextNum})`.slice(0, 50);
    const copied = {
      id: genId(), name: finalName, type: copyDraft.type, startDate: copyDraft.startDate, endDate: copyDraft.endDate,
      items: copyDraft.sourceItems.map(i => ({ ...i, id: genId(), done: false, tags: [...i.tags], days: i.days.filter(d => d <= maxDay) })),
    };
    setEvents(p => [...p, copied]);
    setSelectedEventId(copied.id);
    setCopyDraft(null);
  };
  const isPeriodicType = (type) => type === "periodic" || ["定期","Recurring","Récurrent","Recorrente","Recurrente","정기"].includes(type);
  const typeLabel = (type) => isPeriodicType(type) ? t.periodic : t.oneTime;
  const toggleDay = (d, setter) => setter(p => ({ ...p, days: p.days.includes(d) ? p.days.filter(x=>x!==d).sort((a,b)=>a-b) : [...p.days,d].sort((a,b)=>a-b) }));
  const toggleTag = (tag, setter) => setter(p => ({ ...p, tags: p.tags.includes(tag) ? p.tags.filter(tg=>tg!==tag) : [...p.tags,tag] }));
  const daysLabel = (days) => !days?.length ? "—" : days.map(d => lang==="ja"?`${d}${t.daysUnit}`:lang==="ko"?`${d}${t.daysUnit}`:lang==="zh"?`第${d}${t.daysUnit}`:`Day ${d}`).join(", ");
  const dateDisplay = (ev) => { if (ev.startDate && ev.endDate) return t.dateRange(ev.startDate, ev.endDate); if (ev.startDate) return ev.startDate; return ""; };
  const applySampleAndGo = (langCode) => {
    const sample = sampleEvents[langCode] || sampleEvents["en"];
    setEvents(sample); safeSave("ps_events", sample, (TRANSLATIONS[langCode]||TRANSLATIONS["en"]).storageFull);
    setSelectedEventId(sample[0]?.id || null);
    setScreen("app");
  };

  if (screen === "lang") {
    return (
      <div style={{ background:"#0f0f13", minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, fontFamily:"system-ui,sans-serif" }}>
        <div style={{ fontSize:48, marginBottom:12 }}>🧳</div>
        <div style={{ fontSize:11, color:"#60a5fa", letterSpacing:3, textTransform:"uppercase", marginBottom:6 }}>PACK SMART</div>
        <div style={{ fontSize:24, fontWeight:700, color:"#f0ede8", marginBottom:40 }}>{(TRANSLATIONS[selectedLang]||TRANSLATIONS["en"]).langSelectTitle}</div>
        <div style={{ display:"flex", flexDirection:"column", gap:10, width:"100%", maxWidth:320 }}>
          {LANG_OPTIONS.map(l => (
            <button key={l.code} onClick={() => setSelectedLang(l.code)} style={{ padding:"14px 20px", borderRadius:14, border:selectedLang===l.code?"none":"1px solid #ffffff08", background:selectedLang===l.code?"linear-gradient(135deg,#2563eb,#3b82f6)":"#1a1a26", color:selectedLang===l.code?"white":"#888", fontSize:16, fontWeight:selectedLang===l.code?700:400, cursor:"pointer", textAlign:"left" }}>{l.label}</button>
          ))}
        </div>
        <button onClick={() => {
          setLang(selectedLang); safeSave("ps_lang", selectedLang); safeSave("ps_onboarded","1");
          const existing = safeLoad("ps_events", []);
          if (!existing || existing.length===0) { setScreen("tutorial"); }
          else { applySampleAndGo(selectedLang); }
        }} style={{ marginTop:32, padding:"16px 48px", borderRadius:40, background:"linear-gradient(135deg,#2563eb,#3b82f6)", color:"white", fontSize:16, fontWeight:700, border:"none", cursor:"pointer", width:"100%", maxWidth:320 }}>
          {(TRANSLATIONS[selectedLang]||TRANSLATIONS["en"]).langSelectBtn}
        </button>
      </div>
    );
  }

  if (screen==="tutorial") return <TutorialScreen lang={lang} onFinish={() => setScreen("sample")} onSkip={() => setScreen("sample")} />;
  if (screen==="tutorial-replay") return <TutorialScreen lang={lang} onFinish={() => setScreen("app")} onSkip={() => setScreen("app")} />;

  if (screen==="sample") {
    return (
      <div style={{ background:"#0f0f13", minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:24, fontFamily:lang==="ja"||lang==="zh"||lang==="ko"?"'Hiragino Sans','Noto Sans JP',sans-serif":"system-ui,sans-serif" }}>
        <div style={{ maxWidth:360, width:"100%", background:"#1a1a26", borderRadius:20, padding:"32px 24px", textAlign:"center", border:"1px solid rgba(255,255,255,0.08)" }}>
          <div style={{ fontSize:52, marginBottom:16 }}>📋</div>
          <h2 style={{ color:"#f0ede8", fontSize:20, margin:"0 0 12px", fontWeight:700 }}>{t.sampleModalTitle}</h2>
          <p style={{ color:"rgba(255,255,255,0.5)", fontSize:14, margin:"0 0 28px", lineHeight:1.7 }}>{t.sampleModalDesc}</p>
          <button onClick={() => applySampleAndGo(lang)} style={{ width:"100%", padding:16, borderRadius:14, background:"linear-gradient(135deg,#2563eb,#3b82f6)", color:"#fff", fontSize:16, fontWeight:700, border:"none", marginBottom:12, cursor:"pointer" }}>{t.sampleModalYes}</button>
          <button onClick={() => setScreen("app")} style={{ width:"100%", padding:14, borderRadius:14, background:"rgba(255,255,255,0.06)", color:"rgba(255,255,255,0.6)", fontSize:15, border:"none", cursor:"pointer" }}>{t.sampleModalNo}</button>
        </div>
      </div>
    );
  }

  const sortedEvents = [...events].sort((a, b) => {
    const da = a.startDate || a.nextDate || "";
    const db = b.startDate || b.nextDate || "";
    return db.localeCompare(da);
  });

  const renderEvents = () => (
    <div>
      {showAddEvent && (
        <div style={card}>
          <div style={{ fontSize:13, fontWeight:700, color:"#60a5fa", marginBottom:12 }}>{t.newEvent}</div>
          <input autoFocus placeholder={t.eventNamePlaceholder} value={newEvent.name}
            onChange={e => setNewEvent({ ...newEvent, name:e.target.value })}
            onFocus={e => { e.target.style.border="1.5px solid #3b82f6"; }}
            onBlur={e => { e.target.style.border="1px solid #ffffff15"; }}
            style={inputStyle} />
          {newEvent._error && <div id="new-event-error" style={{ color:"#f87171", fontSize:12, marginBottom:8, marginTop:-4 }}>⚠ {newEvent._error}</div>}
          <DateRangePicker startDate={newEvent.startDate} endDate={newEvent.endDate} onChangeRange={(s,e) => setNewEvent(p => ({ ...p, startDate:s, endDate:e }))} t={t} lang={lang} />
          <div style={{ display:"flex", gap:8, marginTop:4 }}>
            <button onClick={() => setShowAddEvent(false)} style={{ ...pillBtn, background:"#2a2d3e", flex:1 }}>{t.cancel}</button>
            <button onClick={addEventFn} style={{ ...pillBtn, flex:2 }}>{t.create}</button>
          </div>
        </div>
      )}
      {sortedEvents.map(ev => (
        <div key={ev.id} style={{ ...card, marginBottom:10, border: ev.id===selectedEventId ? "1.5px solid #3b82f6" : "1px solid #ffffff08", transition:"border 0.15s" }}>
          {editingEvent?.id===ev.id ? (
            <div>
              <div style={{ fontSize:12, fontWeight:700, color:"#60a5fa", marginBottom:10 }}>{t.editEvent}</div>
              <input value={editingEvent.name} onChange={e => setEditingEvent({ ...editingEvent, name:e.target.value })}
                onFocus={e => { e.target.style.border="1.5px solid #3b82f6"; }}
                onBlur={e => { e.target.style.border="1px solid #ffffff15"; }}
                style={inputStyle} />
              <DateRangePicker startDate={editingEvent.startDate||""} endDate={editingEvent.endDate||""} onChangeRange={(s,e) => setEditingEvent(p => ({ ...p, startDate:s, endDate:e }))} t={t} lang={lang} />
              <div style={{ display:"flex", gap:8, marginBottom:8, marginTop:4 }}>
                <button onClick={() => setEditingEvent(null)} style={{ ...pillBtn, background:"#2a2d3e", flex:1 }}>{t.cancel}</button>
                <button onClick={saveEditEvent} style={{ ...pillBtn, flex:2 }}>{t.save}</button>
              </div>
              <button onClick={() => deleteEvent(ev.id)} style={{ width:"100%", padding:8, borderRadius:8, border:"none", background:"#3a1a1a", color:"#f87171", fontSize:12, fontWeight:600, cursor:"pointer" }}>{t.deleteEvent}</button>
            </div>
          ) : (
            <div>
              <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:isPeriodicType(ev.type)&&ev.items.some(i=>i.done)?10:0 }}>
                <div style={{ flex:1, cursor:"pointer" }} onClick={() => setSelectedEventId(ev.id)} onDoubleClick={() => setEditingEvent({ id:ev.id, name:ev.name, type:ev.type, startDate:ev.startDate||ev.nextDate||"", endDate:ev.endDate||"" })}>
                  <div style={{ fontSize:16, fontWeight:700, marginBottom:4 }}>{ev.name}</div>
                  <div style={{ fontSize:12, display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                    <button onClick={() => { setSelectedEventId(ev.id); setTabIndex(1); }} style={{ background:"#1d4ed840", border:"none", color:"#60a5fa", padding:"2px 10px", borderRadius:10, fontSize:11, cursor:"pointer", fontWeight:600 }}>📋 {t.viewItems}</button>
                    {dateDisplay(ev) && <span style={{ color:"#666" }}>📅 {dateDisplay(ev)}</span>}
                  </div>
                </div>
                <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                  <div style={{ textAlign:"right", cursor:"pointer" }} onClick={() => setSelectedEventId(ev.id)}>
                    <div style={{ fontSize:22, fontWeight:800, color:"#3b82f6" }}>{ev.items.length}</div>
                    <div style={{ fontSize:10, color:"#555" }}>{t.items}</div>
                  </div>
                  <button onClick={() => copyEvent(ev)} style={{ background:"#1a2a3a", border:"none", borderRadius:8, color:"#60a5fa", fontSize:9, fontWeight:700, cursor:"pointer", padding:"6px 7px", lineHeight:1.3 }}><div>CO</div><div>PY</div></button>
                  <button onClick={() => setEditingEvent({ id:ev.id, name:ev.name, type:ev.type, startDate:ev.startDate||ev.nextDate||"", endDate:ev.endDate||"" })} style={{ background:"#1e2030", border:"none", borderRadius:8, color:"#888", fontSize:14, cursor:"pointer", padding:"6px 8px" }}>✎</button>
                </div>
              </div>
              
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const moveItem = (id, dir) => {
    setEvents(p => p.map(ev => {
      if (ev.id !== selectedEventId) return ev;
      const items = [...ev.items];
      const idx = items.findIndex(i => i.id === id);
      const to = idx + dir;
      if (to < 0 || to >= items.length) return ev;
      const tmp = items[idx]; items[idx] = items[to]; items[to] = tmp;
      return { ...ev, items };
    }));
  };

  const renderItems = () => (
    <div>
      <div style={{ marginBottom:12 }}>
        <div style={{ fontSize:18, fontWeight:700 }}>{selectedEvent?.name||t.selectEvent}</div>
        {!selectedEvent && <div style={{ fontSize:12, color:"#555", marginTop:4 }}>{t.selectEventHint}</div>}
        {selectedEvent && <>
          <div style={{ fontSize:12, color:"#555", marginTop:2 }}>{filteredItems.filter(i=>i.done).length} / {filteredItems.length} {t.done}</div>
          <div style={{ height:4, background:"#1e2030", borderRadius:2, marginTop:6, overflow:"hidden" }}>
            <div style={{ height:"100%", width:`${filteredItems.length?(filteredItems.filter(i=>i.done).length/filteredItems.length)*100:0}%`, background:"linear-gradient(90deg,#3b82f6,#60a5fa)", borderRadius:2, transition:"width 0.4s" }} />
          </div>
        </>}
      </div>
      <div style={{ display:"flex", gap:6, marginBottom:10, alignItems:"center" }}>
        {!isReordering && <>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} style={selectStyle}>
            <option value="day">{t.sortDay}</option>
            <option value="prep">{t.sortPrep}</option>
            <option value="name">{t.sortName}</option>
            <option value="qtyDesc">{t.sortQtyDesc}</option>
            <option value="qtyAsc">{t.sortQtyAsc}</option>
          </select>
          <select value={filterPrep} onChange={e => setFilterPrep(e.target.value)} style={selectStyle}>
            <option value="all">{t.prepAll}</option>
            {PREP_KEYS.map((key,idx) => <option key={key} value={key}>{t.prepMethods[idx]}</option>)}
          </select>
        </>}
        <div style={{ marginLeft:"auto", display:"flex", gap:6, flexShrink:0 }}>
          <button onClick={() => { const next = !isReordering; setIsReordering(next); if (next) setSortBy("custom"); }} style={{ ...selectStyle, background:isReordering?"#2563eb":"#1e2030", color:isReordering?"white":"#aaa", border:"none" }}>
            ⇅ {t.sortCustom}
          </button>
          {isReordering && (
            <button onClick={() => { setIsReordering(false); setSortBy("day"); }} style={{ ...selectStyle, background:"#22c55e20", color:"#4ade80", border:"1px solid #22c55e40" }}>
              ✓ {t.sortDone}
            </button>
          )}
        </div>
      </div>
      {filteredItems.length===0&&selectedEvent && <div style={{ textAlign:"center", color:"#444", padding:40, fontSize:14 }}>{t.noItems}<br /><span style={{ fontSize:12, color:"#333" }}>{t.noItemsHint}</span></div>}
      {filteredItems.map((item, idx) => (
        <div key={item.id} style={{ background:item.done&&!isReordering?"#111":"#1a1a26", border:"1px solid "+(item.done&&!isReordering?"#ffffff05":"#ffffff0a"), borderRadius:10, padding:"10px 12px", marginBottom:6, opacity:item.done&&!isReordering?0.5:1 }}>
          {editingItem?.id===item.id && !isReordering ? (
            <div>
              <div style={{ fontSize:12, fontWeight:700, color:"#60a5fa", marginBottom:10 }}>{t.editItem}</div>
              <ItemForm item={editingItem} setter={setEditingItem} onSave={saveEditItem} onCancel={() => setEditingItem(null)} onDelete={() => { deleteItem(item.id); setEditingItem(null); }} t={t} useCat={useCat} userTags={userTags} customPreps={customPreps} toggleDay={toggleDay} daysLabel={daysLabel} maxDay={tripDays(selectedEvent)} />
            </div>
          ) : (
            <div style={{ display:"flex", alignItems:"center", gap:10 }} onDoubleClick={() => !isReordering && setEditingItem({ ...item })}>
              {isReordering ? (
                <div style={{ display:"flex", flexDirection:"column", gap:3, flexShrink:0 }}>
                  <button onClick={() => moveItem(item.id, -1)} disabled={idx===0} style={{ width:30, height:28, borderRadius:6, border:"none", background:idx===0?"#1a1a26":"#1e2030", color:idx===0?"#333":"#60a5fa", fontSize:14, cursor:idx===0?"default":"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>↑</button>
                  <button onClick={() => moveItem(item.id, 1)} disabled={idx===filteredItems.length-1} style={{ width:30, height:28, borderRadius:6, border:"none", background:idx===filteredItems.length-1?"#1a1a26":"#1e2030", color:idx===filteredItems.length-1?"#333":"#60a5fa", fontSize:14, cursor:idx===filteredItems.length-1?"default":"pointer", display:"flex", alignItems:"center", justifyContent:"center" }}>↓</button>
                </div>
              ) : (
                <button onClick={() => toggleDone(item.id)} style={{ width:44, height:44, borderRadius:"50%", border:item.done?"none":"2px solid #3b82f6", background:item.done?"#3b82f6":"transparent", cursor:"pointer", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, color:"white" }}>{item.done?"✓":""}</button>
              )}
              <div style={{ flex:1, minWidth:0 }}>
                <div style={{ fontSize:14, fontWeight:600, textDecoration:item.done&&!isReordering?"line-through":"none", color:item.done&&!isReordering?"#444":"#f0ede8" }}>
                  {item.name}<span style={{ fontSize:12, color:"#666", fontWeight:400, marginLeft:6 }}>×{item.qty}</span>
                </div>
                <div style={{ fontSize:11, color:"#555", marginTop:3, display:"flex", gap:5, flexWrap:"wrap", alignItems:"center" }}>
                  <span style={{ color:"#60a5fa" }}>{daysLabel(item.days)}</span>
                  <span>·</span>
                  <span style={{ color:prepColor(normPrep(item.prep, customPreps), customPreps) }}>{prepLabel(normPrep(item.prep, customPreps), t, customPreps)}{item.prepWhere?`（${item.prepWhere}）`:""}</span>
                  {useCat&&item.category&&<><span>·</span><span>{item.category}</span></>}
                  {item.tags?.map(tag => <span key={tag} style={{ background:"#2a1f3d", color:"#c084fc", padding:"1px 7px", borderRadius:8, fontSize:10 }}>{tag}</span>)}
                </div>
              </div>
              {!isReordering && <>
                <button onClick={() => setEditingItem({ ...item })} style={{ background:"#1e2030", border:"none", borderRadius:8, color:"#888", fontSize:14, cursor:"pointer", padding:"6px 8px", flexShrink:0 }}>✎</button>
                <button onClick={() => deleteItem(item.id)} style={{ background:"#2a1a1a", border:"none", borderRadius:8, color:"#f87171", fontSize:12, cursor:"pointer", padding:"6px 8px", flexShrink:0 }}>🗑</button>
              </>}
            </div>
          )}
        </div>
      ))}
    </div>
  );

  const renderSettings = () => (
    <div>
      <div style={{ fontSize:16, fontWeight:700, marginBottom:16 }}>{t.settings}</div>
      <button onClick={() => setScreen("tutorial-replay")} style={{ width:"100%", marginBottom:14, padding:"16px 20px", borderRadius:16, border:"1px solid #3b82f620", background:"linear-gradient(135deg,#1a2540,#1e2a45)", cursor:"pointer", display:"flex", alignItems:"center", gap:14, textAlign:"left", boxSizing:"border-box" }}>
        <div style={{ fontSize:28, lineHeight:1, flexShrink:0 }}>📖</div>
        <div style={{ flex:1 }}>
          <div style={{ fontSize:14, fontWeight:700, color:"#60a5fa", marginBottom:3 }}>{t.tutorialReplayTitle}</div>
          <div style={{ fontSize:12, color:"#555" }}>{t.tutorialReplayDesc}</div>
        </div>
        <div style={{ color:"#3b82f6", fontSize:18, flexShrink:0 }}>›</div>
      </button>
      <div style={card}>
        <div style={{ fontSize:14, fontWeight:600, marginBottom:10 }}>{t.language}</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:12 }}>
          {LANG_OPTIONS.map(l => <button key={l.code} onClick={() => { setLang(l.code); setNewItem(emptyItem()); }} style={{ padding:"8px 14px", borderRadius:20, border:"none", background:lang===l.code?"#3b82f6":"#1e2030", color:lang===l.code?"white":"#888", fontSize:13, fontWeight:lang===l.code?700:400, cursor:"pointer" }}>{l.label}</button>)}
        </div>
        <button onClick={() => { setSelectedLang(lang); setScreen("lang"); }} style={{ width:"100%", padding:"10px", borderRadius:12, border:"1px solid #ffffff15", background:"transparent", color:"#60a5fa", fontSize:13, cursor:"pointer" }}>🌐 Change language</button>
      </div>
      <div style={card}>
        <div style={{ fontSize:14, fontWeight:600, marginBottom:4 }}>{t.prepMethod}（カスタム）</div>
        <div style={{ fontSize:11, color:"#555", marginBottom:12 }}>{t.customPrepLabel || "準備方法を追加できます"}</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:12 }}>
          {customPreps.map(prep => (
            <div key={prep} style={{ display:"flex", alignItems:"center", gap:4, background:"#1a2a40", borderRadius:20, padding:"5px 10px" }}>
              <span style={{ fontSize:12, color:"#60a5fa" }}>{prep}</span>
              <button onClick={() => setCustomPreps(p => p.filter(pp => pp!==prep))} style={{ background:"none", border:"none", color:"#3b82f6", cursor:"pointer", fontSize:13, padding:0, lineHeight:1 }}>✕</button>
            </div>
          ))}
          {customPreps.length===0 && <span style={{ fontSize:12, color:"#444" }}>なし</span>}
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <input placeholder={t.customPrepPlaceholder || "例：現地調達"} value={newPrepInput} onChange={e => setNewPrepInput(e.target.value)}
            onKeyDown={e => { if (e.key==="Enter"&&newPrepInput.trim()) { setCustomPreps(p => [...p, newPrepInput.trim()]); setNewPrepInput(""); }}}
            style={{ ...inputStyle, marginBottom:0, flex:1 }} />
          <button onClick={() => { if (newPrepInput.trim()) { setCustomPreps(p => [...p, newPrepInput.trim()]); setNewPrepInput(""); }}} style={{ ...pillBtn, flexShrink:0 }}>{t.addTag}</button>
        </div>
      </div>
      <div style={{ ...card, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <div style={{ flex:1, marginRight:16 }}>
          <div style={{ fontSize:14, fontWeight:600 }}>{t.useCat}</div>
          <div style={{ fontSize:11, color:"#555", marginTop:2 }}>{t.useCatDesc}</div>
        </div>
        <button onClick={() => setUseCat(v => !v)} style={{ width:48, height:28, borderRadius:14, border:"none", background:useCat?"#3b82f6":"#2a2d3e", cursor:"pointer", position:"relative", transition:"background 0.2s", flexShrink:0 }}>
          <div style={{ width:20, height:20, borderRadius:"50%", background:"white", position:"absolute", top:4, left:useCat?24:4, transition:"left 0.2s" }} />
        </button>
      </div>
      <div style={card}>
        <div style={{ fontSize:14, fontWeight:600, marginBottom:4 }}>{t.manageTags}</div>
        <div style={{ fontSize:11, color:"#555", marginBottom:12 }}>{t.manageTagsDesc}（<span style={{ color:"#22c55e" }}>●</span>デフォルト / <span style={{ color:"#a855f7" }}>●</span>カスタム）</div>
        <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:12 }}>
          {userTags.map(tag => (
            <div key={tag} style={{ display:"flex", alignItems:"center", gap:4, background:"#2a1f3d", borderRadius:20, padding:"5px 10px" }}>
              <span style={{ fontSize:12, color:"#c084fc" }}>{tag}</span>
              <button onClick={() => { setUserTags(p => p.filter(tg => tg!==tag)); setEvents(p => p.map(ev => ({ ...ev, items:ev.items.map(i => ({ ...i, tags:i.tags.filter(tg => tg!==tag) })) }))); }} style={{ background:"none", border:"none", color:"#7c3aed", cursor:"pointer", fontSize:13, padding:0, lineHeight:1 }}>✕</button>
            </div>
          ))}
          {userTags.length===0 && <span style={{ fontSize:12, color:"#444" }}>{t.noTags}</span>}
        </div>
        <div style={{ display:"flex", gap:8 }}>
          <input placeholder={t.newTag} value={newTagInput} onChange={e => setNewTagInput(e.target.value)} onKeyDown={e => { if (e.key==="Enter"&&newTagInput.trim()) { setUserTags(p => [...p, newTagInput.trim()]); setNewTagInput(""); }}} style={{ ...inputStyle, marginBottom:0, flex:1 }} />
          <button onClick={() => { if (newTagInput.trim()) { setUserTags(p => [...p, newTagInput.trim()]); setNewTagInput(""); }}} style={{ ...pillBtn, flexShrink:0 }}>{t.addTag}</button>
        </div>
      </div>
    </div>
  );

  const tabContents = [renderEvents(), renderItems(), renderSettings()];

  return (
    <div style={{ fontFamily:lang==="ja"||lang==="zh"||lang==="ko"?"'Hiragino Sans','Noto Sans JP',sans-serif":"system-ui,sans-serif", background:"#0f0f13", minHeight:"100vh", color:"#f0ede8", maxWidth:430, margin:"0 auto" }}>
      {showAddItem && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", zIndex:200, display:"flex", alignItems:"flex-end", justifyContent:"center" }}>
          <div style={{ background:"#1a1a26", borderRadius:"20px 20px 0 0", padding:"10px 14px 24px", width:"100%", maxWidth:430, maxHeight:"95vh", overflowY:"auto", border:"1px solid #ffffff12" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
              <div style={{ fontSize:13, fontWeight:700, color:"#60a5fa" }}>{selectedEvent ? t.addTo(selectedEvent.name) : t.selectEvent}</div>
              <button onClick={() => { setShowAddItem(false); setNewItem(emptyItem()); }} style={{ background:"#2a2d3e", border:"none", borderRadius:8, color:"#888", fontSize:13, cursor:"pointer", padding:"4px 8px" }}>✕</button>
            </div>
            {selectedEvent
              ? <ItemForm item={newItem} setter={setNewItem} onSave={addItem} onCancel={() => { setShowAddItem(false); setNewItem(emptyItem()); setAddItemError(""); }} t={t} useCat={useCat} userTags={userTags} customPreps={customPreps} toggleDay={toggleDay} daysLabel={daysLabel} maxDay={tripDays(selectedEvent)} error={addItemError} />
              : <div style={{ textAlign:"center", color:"#555", padding:40, fontSize:14 }}>{t.selectEventHint}</div>
            }
          </div>
        </div>
      )}
      {copyDraft && (
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.75)", zIndex:200, display:"flex", alignItems:"center", justifyContent:"center", padding:24 }}>
          <div style={{ background:"#1a1a26", borderRadius:20, padding:"24px 20px", width:"100%", maxWidth:360, border:"1px solid #ffffff12" }}>
            <div style={{ fontSize:14, fontWeight:700, color:"#60a5fa", marginBottom:16 }}>{t.copyEventTitle}</div>
            <input value={copyDraft.name} onChange={e => setCopyDraft(p => ({ ...p, name: e.target.value }))} style={inputStyle} />
            {copyDraft.name === (copyDraft.baseName || "") && (() => {
              const baseName = copyDraft.baseName || copyDraft.name;
              const existing = events.map(e => { const m = e.name.match(/^(.+) \((\d+)\)$/); return m && m[1]===baseName ? parseInt(m[2]) : 0; }).filter(n => n > 0);
              const nextNum = existing.length > 0 ? Math.max(...existing) + 1 : 1;
              return <div style={{ background:"#1a2540", borderRadius:8, padding:"8px 12px", marginBottom:8, marginTop:-4, fontSize:12, color:"#60a5fa", lineHeight:1.5 }}>
                💡 タイトルが同じため「{baseName} ({nextNum})」として保存されます
              </div>;
            })()}
            <DateRangePicker startDate={copyDraft.startDate} endDate={copyDraft.endDate} onChangeRange={(s,e) => setCopyDraft(p => ({ ...p, startDate:s, endDate:e }))} t={t} lang={lang} />
            <div style={{ display:"flex", gap:8, marginTop:8 }}>
              <button onClick={() => setCopyDraft(null)} style={{ ...pillBtn, background:"#2a2d3e", flex:1 }}>{t.cancel}</button>
              <button onClick={confirmCopy} style={{ ...pillBtn, flex:2 }}>{t.copyEventConfirm}</button>
            </div>
          </div>
        </div>
      )}
      <div style={{ background:"linear-gradient(135deg,#1a1a2e 0%,#16213e 100%)", padding:"14px 16px 0", borderBottom:"1px solid #ffffff10" }}>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
          <div>
            <div style={{ fontSize:11, color:"#60a5fa", letterSpacing:3, textTransform:"uppercase", marginBottom:2 }}>{t.appSub}</div>
            <div style={{ fontSize:19, fontWeight:700, letterSpacing:-0.5 }}>{t.appTitle}</div>
          </div>
        </div>
        <div style={{ display:"flex" }}>
          {t.tabs.map((tab, i) => {
            const isItemsTab = i === 1;
            const disabled = isItemsTab && !selectedEventId;
            return (
              <button key={i} onClick={() => { if (!disabled) setTabIndex(i); }} style={{ flex:1, background:"none", border:"none", color: disabled ? "#333" : tabIndex===i?"#60a5fa":"#555", padding:"8px 2px", fontSize:11, fontWeight:tabIndex===i?700:400, borderBottom:tabIndex===i?"2px solid #3b82f6":"2px solid transparent", cursor:disabled?"not-allowed":"pointer" }}>{tab}</button>
            );
          })}
        </div>
      </div>
      <div style={{ padding:16, paddingBottom:96 }}>{tabContents[tabIndex]}</div>
      {tabIndex===0 && (
        <button onClick={() => setShowAddEvent(true)} style={{ position:"fixed", bottom:24, right:24, borderRadius:40, background:"linear-gradient(135deg,#2563eb,#3b82f6)", border:"none", color:"white", fontSize:15, fontWeight:700, cursor:"pointer", boxShadow:"0 4px 20px #2563eb66", zIndex:100, padding:"14px 20px", display:"flex", alignItems:"center", gap:6 }}>
          ＋ {t.addEvent.replace("＋ ","").replace("+ ","")}
        </button>
      )}
      {tabIndex===1 && (
        <button onClick={() => setShowAddItem(true)} style={{ position:"fixed", bottom:24, right:24, borderRadius:40, background:"linear-gradient(135deg,#2563eb,#3b82f6)", border:"none", color:"white", fontSize:15, fontWeight:700, cursor:"pointer", boxShadow:"0 4px 20px #2563eb66", zIndex:100, padding:"14px 20px", display:"flex", alignItems:"center", gap:6 }}>
          ＋ {t.addItem.replace("＋ ","").replace("+ ","")}
        </button>
      )}
    </div>
  );
}
