import { useState } from "react";
import Icon from "@/components/ui/icon";

const HERO_IMG = "https://cdn.poehali.dev/projects/bf099e43-b141-480c-a9e9-c917937c2e94/files/4cec1991-66ba-416d-994b-0bed14e16ebf.jpg";
const BLUEPRINT_IMG = "https://cdn.poehali.dev/projects/bf099e43-b141-480c-a9e9-c917937c2e94/files/1a5e1c03-7e13-454b-832d-193e5cd7c077.jpg";

type Section = "home" | "about" | "custom" | "catalog" | "contacts";
type CatalogCategory = "all" | "flanges" | "pipeline" | "filters";
type MaterialFilter = "all" | "steel" | "stainless" | "cast-iron";
type GostFilter = "all" | "gost-12820" | "gost-12821" | "gost-17375" | "gost-1461";

const catalogItems = [
  { id: 1, name: "Фланец плоский приварной", category: "flanges" as CatalogCategory, material: "steel" as MaterialFilter, gost: "gost-12820" as GostFilter, dn: "Ду 15–1400", pressure: "Ру 0,6–2,5 МПа", gostLabel: "ГОСТ 12820-80", desc: "Фланцы плоские приварные стальные для трубопроводов" },
  { id: 2, name: "Фланец воротниковый", category: "flanges" as CatalogCategory, material: "steel" as MaterialFilter, gost: "gost-12821" as GostFilter, dn: "Ду 15–1000", pressure: "Ру 1,0–20,0 МПа", gostLabel: "ГОСТ 12821-80", desc: "Фланцы свободные на приварном кольце стальные" },
  { id: 3, name: "Фланец из нержавеющей стали", category: "flanges" as CatalogCategory, material: "stainless" as MaterialFilter, gost: "gost-12820" as GostFilter, dn: "Ду 15–600", pressure: "Ру 0,6–4,0 МПа", gostLabel: "ГОСТ 12820-80", desc: "Из нержавеющей стали 12Х18Н10Т, 08Х18Н10Т" },
  { id: 4, name: "Отвод крутоизогнутый", category: "pipeline" as CatalogCategory, material: "steel" as MaterialFilter, gost: "gost-17375" as GostFilter, dn: "Ду 15–600", pressure: "Ру до 16 МПа", gostLabel: "ГОСТ 17375-2001", desc: "Детали трубопроводов бесшовные крутоизогнутые" },
  { id: 5, name: "Тройник стальной", category: "pipeline" as CatalogCategory, material: "steel" as MaterialFilter, gost: "gost-17375" as GostFilter, dn: "Ду 15–600", pressure: "Ру до 16 МПа", gostLabel: "ГОСТ 17376-2001", desc: "Тройники равнопроходные и переходные стальные" },
  { id: 6, name: "Переход концентрический", category: "pipeline" as CatalogCategory, material: "stainless" as MaterialFilter, gost: "gost-17375" as GostFilter, dn: "Ду 15–600", pressure: "Ру до 16 МПа", gostLabel: "ГОСТ 17378-2001", desc: "Переходы концентрические и эксцентрические" },
  { id: 7, name: "Грязевик фланцевый", category: "filters" as CatalogCategory, material: "steel" as MaterialFilter, gost: "gost-1461" as GostFilter, dn: "Ду 50–300", pressure: "Ру 1,0–1,6 МПа", gostLabel: "ТУ 3712-001", desc: "Грязевики для систем теплоснабжения и водоснабжения" },
  { id: 8, name: "Фильтр сетчатый чугунный", category: "filters" as CatalogCategory, material: "cast-iron" as MaterialFilter, gost: "gost-1461" as GostFilter, dn: "Ду 15–200", pressure: "Ру 1,6 МПа", gostLabel: "ГОСТ 16532-70", desc: "Фильтры сетчатые фланцевые чугунные типа «косой»" },
  { id: 9, name: "Фильтр магнитный", category: "filters" as CatalogCategory, material: "stainless" as MaterialFilter, gost: "gost-1461" as GostFilter, dn: "Ду 15–100", pressure: "Ру 1,6 МПа", gostLabel: "ТУ 3712-003", desc: "Магнитные фильтры для защиты оборудования от шлама" },
];

const categoryLabels: Record<CatalogCategory, string> = { all: "Все изделия", flanges: "Фланцы", pipeline: "Детали трубопровода", filters: "Грязевики и фильтры" };
const materialLabels: Record<MaterialFilter, string> = { all: "Все материалы", steel: "Сталь", stainless: "Нержавеющая сталь", "cast-iron": "Чугун" };
const gostLabels: Record<GostFilter, string> = { all: "Все ГОСТ", "gost-12820": "ГОСТ 12820-80", "gost-12821": "ГОСТ 12821-80", "gost-17375": "ГОСТ 17375-2001", "gost-1461": "ТУ/ГОСТ 16532" };

const navItems: { id: Section; label: string }[] = [
  { id: "home", label: "Главная" },
  { id: "about", label: "О компании" },
  { id: "custom", label: "По чертежам" },
  { id: "catalog", label: "Каталог" },
  { id: "contacts", label: "Контакты" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState<Section>("home");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState<CatalogCategory>("all");
  const [materialFilter, setMaterialFilter] = useState<MaterialFilter>("all");
  const [gostFilter, setGostFilter] = useState<GostFilter>("all");

  const navigate = (section: Section) => {
    setActiveSection(section);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const filteredItems = catalogItems.filter((item) => {
    if (categoryFilter !== "all" && item.category !== categoryFilter) return false;
    if (materialFilter !== "all" && item.material !== materialFilter) return false;
    if (gostFilter !== "all" && item.gost !== gostFilter) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background font-ibm">
      {/* HEADER */}
      <header className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <button onClick={() => navigate("home")} className="flex items-center gap-3 group">
              <div className="w-8 h-8 bg-blue-brand flex items-center justify-center flex-shrink-0">
                <Icon name="Settings2" size={16} className="text-white" />
              </div>
              <div className="text-left">
                <div className="font-oswald text-base font-semibold text-navy leading-none tracking-wide uppercase">ПромТехКомплект</div>
                <div className="font-ibm text-[10px] text-steel tracking-widest uppercase leading-none mt-0.5">Трубопроводная арматура</div>
              </div>
            </button>

            <nav className="hidden md:flex items-center gap-6">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => navigate(item.id)}
                  className={`font-oswald text-xs tracking-widest uppercase transition-colors duration-200 ${activeSection === item.id ? "text-blue-brand border-b-2 border-blue-brand pb-0.5" : "text-steel hover:text-blue-brand"}`}
                >
                  {item.label}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <button
                onClick={() => navigate("contacts")}
                className="hidden md:flex items-center gap-2 bg-blue-brand text-white font-ibm text-xs font-medium px-4 py-2 hover:bg-[hsl(214,75%,22%)] transition-colors uppercase tracking-wider"
              >
                <Icon name="Phone" size={12} />
                Связаться
              </button>
              <button className="md:hidden p-2" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
                <Icon name={mobileMenuOpen ? "X" : "Menu"} size={20} className="text-navy" />
              </button>
            </div>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-border px-4 py-4 flex flex-col gap-3 animate-fade-in">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => navigate(item.id)}
                className={`font-oswald text-sm text-left py-2 border-b border-border last:border-0 uppercase tracking-widest ${activeSection === item.id ? "text-blue-brand" : "text-steel"}`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {activeSection === "home" && <HomeSection onNavigate={navigate} />}
      {activeSection === "about" && <AboutSection onNavigate={navigate} />}
      {activeSection === "custom" && <CustomSection onNavigate={navigate} />}
      {activeSection === "catalog" && (
        <CatalogSection
          filteredItems={filteredItems}
          categoryFilter={categoryFilter}
          setCategoryFilter={setCategoryFilter}
          materialFilter={materialFilter}
          setMaterialFilter={setMaterialFilter}
          gostFilter={gostFilter}
          setGostFilter={setGostFilter}
          onNavigate={navigate}
        />
      )}
      {activeSection === "contacts" && <ContactsSection />}

      {/* FOOTER */}
      <footer className="bg-navy text-white py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="font-oswald text-lg tracking-wide uppercase mb-2">ПромТехКомплект</div>
              <p className="font-ibm text-sm text-slate-400 leading-relaxed">Производство и поставка промышленной трубопроводной арматуры с 2005 года.</p>
            </div>
            <div>
              <div className="font-oswald text-sm tracking-widest uppercase text-slate-400 mb-3">Разделы</div>
              <div className="flex flex-col gap-2">
                {navItems.map((item) => (
                  <button key={item.id} onClick={() => navigate(item.id)} className="font-ibm text-sm text-slate-300 hover:text-white text-left transition-colors">{item.label}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="font-oswald text-sm tracking-widest uppercase text-slate-400 mb-3">Контакты</div>
              <div className="flex flex-col gap-2 text-sm text-slate-300">
                <div className="flex items-center gap-2"><Icon name="Phone" size={14} className="text-slate-400 flex-shrink-0" />+7 (495) 000-00-00</div>
                <div className="flex items-center gap-2"><Icon name="Mail" size={14} className="text-slate-400 flex-shrink-0" />info@promtehkomplekt.ru</div>
                <div className="flex items-start gap-2"><Icon name="MapPin" size={14} className="text-slate-400 flex-shrink-0 mt-0.5" />г. Москва, ул. Промышленная, д. 1</div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center gap-2">
            <p className="font-ibm text-xs text-slate-500">© 2024 ПромТехКомплект. Все права защищены.</p>
            <p className="font-ibm text-xs text-slate-500">ИНН 7700000000 / ОГРН 1050000000000</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ── HOME ── */
function HomeSection({ onNavigate }: { onNavigate: (s: Section) => void }) {
  return (
    <main>
      <section className="relative overflow-hidden hero-pattern grid-pattern min-h-[580px] flex items-center">
        <div className="absolute inset-0">
          <img src={HERO_IMG} alt="Производство" className="w-full h-full object-cover opacity-20" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 py-20 md:py-28">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6 animate-fade-in">
              <span className="rule-line"></span>
              <span className="font-ibm text-xs tracking-widest uppercase text-blue-300">Производство с 2005 года</span>
            </div>
            <h1 className="font-oswald text-4xl md:text-5xl lg:text-6xl font-medium text-white leading-tight mb-6 animate-slide-up stagger-1">
              Промышленная<br />трубопроводная<br />арматура
            </h1>
            <p className="font-ibm text-base text-slate-300 leading-relaxed mb-8 max-w-lg animate-slide-up stagger-2">
              Фланцы, детали трубопровода, грязевики и фильтры по ГОСТ. Собственное производство, изготовление по чертежам заказчика.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 animate-slide-up stagger-3">
              <button onClick={() => onNavigate("catalog")} className="flex items-center justify-center gap-2 bg-white text-navy font-oswald text-sm font-medium px-6 py-3 hover:bg-slate-100 transition-colors uppercase tracking-wider">
                <Icon name="BookOpen" size={16} />Каталог продукции
              </button>
              <button onClick={() => onNavigate("contacts")} className="flex items-center justify-center gap-2 border border-white/40 text-white font-oswald text-sm font-medium px-6 py-3 hover:bg-white/10 transition-colors uppercase tracking-wider">
                <Icon name="MessageSquare" size={16} />Запросить цену
              </button>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-border">
            {[
              { value: "19+", label: "Лет на рынке" },
              { value: "500+", label: "Позиций в каталоге" },
              { value: "1500+", label: "Клиентов" },
              { value: "48 ч", label: "Среднее время изготовления" },
            ].map((stat) => (
              <div key={stat.label} className="py-6 px-4 sm:px-8 text-center">
                <div className="font-oswald text-3xl font-semibold text-blue-brand">{stat.value}</div>
                <div className="font-ibm text-xs text-steel uppercase tracking-wider mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <section className="py-16 md:py-20 bg-secondary/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="rule-line"></span>
            <span className="font-ibm text-xs tracking-widest uppercase text-steel">Продукция</span>
          </div>
          <h2 className="font-oswald text-3xl md:text-4xl font-medium text-navy mb-10">Основные категории</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "CircleDot", title: "Фланцы", desc: "Плоские, воротниковые, свободные. Материалы: углеродистая и нержавеющая сталь. По ГОСТ 12820-80, 12821-80." },
              { icon: "GitBranch", title: "Детали трубопровода", desc: "Отводы, тройники, переходы, заглушки. Бесшовные и сварные. ГОСТ 17375-2001 — 17378-2001." },
              { icon: "Filter", title: "Грязевики и фильтры", desc: "Грязевики фланцевые, фильтры сетчатые и магнитные для систем тепло- и водоснабжения." },
            ].map((cat) => (
              <div key={cat.title} className="catalog-card bg-white border border-border p-6 group">
                <div className="w-10 h-10 bg-blue-brand/10 flex items-center justify-center mb-4">
                  <Icon name={cat.icon} size={20} className="text-blue-brand" />
                </div>
                <h3 className="font-oswald text-xl font-medium text-navy mb-2">{cat.title}</h3>
                <p className="font-ibm text-sm text-steel leading-relaxed mb-4">{cat.desc}</p>
                <button onClick={() => onNavigate("catalog")} className="font-ibm text-xs text-blue-brand flex items-center gap-1 uppercase tracking-wider hover:gap-2 transition-all">
                  Смотреть каталог<Icon name="ArrowRight" size={12} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="rule-line"></span>
                <span className="font-ibm text-xs tracking-widest uppercase text-steel">Услуги</span>
              </div>
              <h2 className="font-oswald text-3xl md:text-4xl font-medium text-navy mb-4">Изготовление<br />по чертежам</h2>
              <p className="font-ibm text-sm text-steel leading-relaxed mb-6">Принимаем заказы на нестандартные изделия по ТЗ заказчика. Форматы: DWG, PDF, DXF. Собственная производственная база.</p>
              <ul className="flex flex-col gap-3 mb-8">
                {["Разработка КД по ТЗ заказчика", "Любые марки стали и сплавов", "Партии от 1 штуки", "Сертификаты качества на изделия"].map((item) => (
                  <li key={item} className="flex items-start gap-3 font-ibm text-sm text-steel">
                    <Icon name="Check" size={16} className="text-blue-brand flex-shrink-0 mt-0.5" />{item}
                  </li>
                ))}
              </ul>
              <button onClick={() => onNavigate("custom")} className="inline-flex items-center gap-2 bg-blue-brand text-white font-oswald text-sm font-medium px-6 py-3 hover:bg-[hsl(214,75%,22%)] transition-colors uppercase tracking-wider">
                Подробнее<Icon name="ArrowRight" size={16} />
              </button>
            </div>
            <div className="relative">
              <div className="absolute -top-4 -left-4 w-24 h-24 bg-blue-brand/8 z-0" />
              <img src={BLUEPRINT_IMG} alt="Чертёж" className="w-full aspect-[4/3] object-cover relative z-10" />
              <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-blue-brand/15 z-0" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-navy">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="rule-line"></span>
            <span className="font-ibm text-xs tracking-widest uppercase text-slate-400">Преимущества</span>
          </div>
          <h2 className="font-oswald text-3xl md:text-4xl font-medium text-white mb-10">Почему выбирают нас</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-slate-700">
            {[
              { icon: "ShieldCheck", title: "Качество", desc: "Продукция соответствует ГОСТ и международным стандартам. Сертификаты на все партии." },
              { icon: "Clock", title: "Сроки", desc: "Стандартные изделия — со склада. Нестандартные — в течение 2–10 рабочих дней." },
              { icon: "BarChart2", title: "Объём", desc: "Работаем с крупным оптом и единичными заказами. Гибкая система скидок." },
              { icon: "Headphones", title: "Поддержка", desc: "Технические специалисты помогут подобрать изделия под ваш проект." },
            ].map((adv) => (
              <div key={adv.title} className="bg-navy p-6">
                <div className="w-10 h-10 border border-slate-600 flex items-center justify-center mb-4">
                  <Icon name={adv.icon} size={18} className="text-blue-300" />
                </div>
                <h3 className="font-oswald text-lg font-medium text-white mb-2">{adv.title}</h3>
                <p className="font-ibm text-sm text-slate-400 leading-relaxed">{adv.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-14 bg-white border-t border-border">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="font-oswald text-3xl font-medium text-navy mb-4">Готовы сделать заказ?</h2>
          <p className="font-ibm text-sm text-steel mb-8">Отправьте запрос — наш менеджер свяжется в течение 30 минут.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => onNavigate("contacts")} className="inline-flex items-center justify-center gap-2 bg-blue-brand text-white font-oswald text-sm font-medium px-8 py-3 hover:bg-[hsl(214,75%,22%)] transition-colors uppercase tracking-wider">
              <Icon name="Mail" size={16} />Отправить запрос
            </button>
            <button onClick={() => onNavigate("catalog")} className="inline-flex items-center justify-center gap-2 border border-navy text-navy font-oswald text-sm font-medium px-8 py-3 hover:bg-navy hover:text-white transition-colors uppercase tracking-wider">
              <Icon name="BookOpen" size={16} />Открыть каталог
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ── ABOUT ── */
function AboutSection({ onNavigate }: { onNavigate: (s: Section) => void }) {
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 py-14 md:py-20">
      <div className="flex items-center gap-3 mb-2">
        <span className="rule-line"></span>
        <span className="font-ibm text-xs tracking-widest uppercase text-steel">О компании</span>
      </div>
      <h1 className="font-oswald text-4xl font-medium text-navy mb-10">ПромТехКомплект</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-14">
        <div>
          <p className="font-ibm text-sm text-steel leading-relaxed mb-4">
            Компания <strong className="text-navy">ПромТехКомплект</strong> основана в 2005 году и специализируется на производстве и поставке промышленной трубопроводной арматуры для объектов тепло- и водоснабжения, нефтяной, химической и пищевой промышленности.
          </p>
          <p className="font-ibm text-sm text-steel leading-relaxed mb-4">
            Мы располагаем собственной производственной базой площадью 3 200 м², оснащённой современным токарно-фрезерным, сварочным и контрольно-измерительным оборудованием.
          </p>
          <p className="font-ibm text-sm text-steel leading-relaxed">
            Вся продукция проходит технический контроль и сопровождается сертификатами соответствия ГОСТ, паспортами качества и протоколами испытаний.
          </p>
        </div>
        <div>
          <img src={HERO_IMG} alt="Производство" className="w-full aspect-video object-cover" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
        {[
          { icon: "Building2", title: "Собственное производство", desc: "Площадь цехов 3 200 м². Полный производственный цикл от заготовки до контроля качества." },
          { icon: "FileCheck", title: "Сертификация", desc: "ISO 9001:2015. Все изделия сопровождаются сертификатами качества и паспортами." },
          { icon: "Truck", title: "Доставка", desc: "Доставка транспортными компаниями по всей России. Самовывоз со склада в Москве." },
          { icon: "Users", title: "Команда", desc: "Более 85 специалистов — инженеры, технологи, конструкторы и менеджеры проектов." },
          { icon: "Layers", title: "Складской запас", desc: "Более 500 позиций в наличии на складе. Постоянный резерв типовых изделий." },
          { icon: "Award", title: "Опыт", desc: "19 лет работы с ведущими промышленными предприятиями России и СНГ." },
        ].map((item) => (
          <div key={item.title} className="bg-secondary/40 border border-border p-5">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-blue-brand/10 flex items-center justify-center flex-shrink-0">
                <Icon name={item.icon} size={16} className="text-blue-brand" />
              </div>
              <h3 className="font-oswald text-base font-medium text-navy">{item.title}</h3>
            </div>
            <p className="font-ibm text-sm text-steel leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="border-t border-border pt-8 text-center">
        <button onClick={() => onNavigate("contacts")} className="inline-flex items-center gap-2 bg-blue-brand text-white font-oswald text-sm font-medium px-8 py-3 hover:bg-[hsl(214,75%,22%)] transition-colors uppercase tracking-wider">
          Связаться с нами<Icon name="ArrowRight" size={16} />
        </button>
      </div>
    </main>
  );
}

/* ── CUSTOM ── */
function CustomSection({ onNavigate }: { onNavigate: (s: Section) => void }) {
  return (
    <main>
      <div className="bg-secondary/40 border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="rule-line"></span>
            <span className="font-ibm text-xs tracking-widest uppercase text-steel">Услуги</span>
          </div>
          <h1 className="font-oswald text-4xl font-medium text-navy mb-4">Изготовление по чертежам</h1>
          <p className="font-ibm text-sm text-steel max-w-xl leading-relaxed">Принимаем заказы на нестандартные фланцы, детали трубопровода и фильтры по чертежам и ТЗ заказчика.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 mb-14">
          <div>
            <h2 className="font-oswald text-2xl font-medium text-navy mb-6">Порядок работы</h2>
            <div className="flex flex-col gap-6">
              {[
                { step: "01", title: "Передача ТЗ", desc: "Вы отправляете чертёж или техническое задание: DWG, PDF, DXF, STEP, IGES или в произвольном описании." },
                { step: "02", title: "Расчёт и КП", desc: "Наши инженеры направляют коммерческое предложение со сроками и стоимостью — в течение 24 часов." },
                { step: "03", title: "Согласование", desc: "Согласовываем материалы, допуски, требования к контролю качества и оформляем договор." },
                { step: "04", title: "Производство", desc: "Изготовление в собственных цехах. Контроль на каждом этапе. Промежуточные фото по запросу." },
                { step: "05", title: "Отгрузка", desc: "Изделия упаковываются и отгружаются с сертификатами качества и протоколами испытаний." },
              ].map((step) => (
                <div key={step.step} className="flex gap-5">
                  <div className="font-oswald text-3xl font-light text-blue-brand/30 leading-none flex-shrink-0 w-10">{step.step}</div>
                  <div>
                    <h3 className="font-oswald text-base font-medium text-navy mb-1">{step.title}</h3>
                    <p className="font-ibm text-sm text-steel leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <img src={BLUEPRINT_IMG} alt="Чертёж" className="w-full aspect-[4/3] object-cover mb-6" />
            <div className="bg-blue-brand/5 border border-blue-brand/20 p-5">
              <h3 className="font-oswald text-base font-medium text-navy mb-3">Принимаемые форматы документации</h3>
              <div className="grid grid-cols-3 gap-2">
                {["DWG", "DXF", "PDF", "STEP", "IGES", "JPEG"].map((fmt) => (
                  <div key={fmt} className="bg-white border border-border text-center py-2 font-ibm text-xs font-medium text-steel tracking-wider">{fmt}</div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border pt-12 mb-12">
          <h2 className="font-oswald text-2xl font-medium text-navy mb-6">Обрабатываемые материалы</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {["Ст3, Ст20", "09Г2С", "12Х18Н10Т", "08Х18Н10Т", "20Х13", "Чугун СЧ20", "АК6, Д16", "Бронза БрАЖ", "Латунь Л63", "AISI 304/316", "Хастелой С276", "Инконель 625"].map((mat) => (
              <div key={mat} className="bg-secondary/60 border border-border px-3 py-2 text-center font-ibm text-xs text-steel">{mat}</div>
            ))}
          </div>
        </div>

        <div className="bg-navy p-8 text-white text-center">
          <h2 className="font-oswald text-2xl font-medium mb-3">Отправьте чертёж — получите КП за 24 часа</h2>
          <p className="font-ibm text-sm text-slate-300 mb-6">Расчёт стоимости и сроков бесплатно</p>
          <button onClick={() => onNavigate("contacts")} className="inline-flex items-center gap-2 bg-white text-navy font-oswald text-sm font-medium px-8 py-3 hover:bg-slate-100 transition-colors uppercase tracking-wider">
            Отправить запрос<Icon name="ArrowRight" size={16} />
          </button>
        </div>
      </div>
    </main>
  );
}

/* ── CATALOG ── */
interface CatalogSectionProps {
  filteredItems: typeof catalogItems;
  categoryFilter: CatalogCategory;
  setCategoryFilter: (v: CatalogCategory) => void;
  materialFilter: MaterialFilter;
  setMaterialFilter: (v: MaterialFilter) => void;
  gostFilter: GostFilter;
  setGostFilter: (v: GostFilter) => void;
  onNavigate: (s: Section) => void;
}

function CatalogSection({ filteredItems, categoryFilter, setCategoryFilter, materialFilter, setMaterialFilter, gostFilter, setGostFilter, onNavigate }: CatalogSectionProps) {
  return (
    <main>
      <div className="bg-secondary/40 border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="rule-line"></span>
            <span className="font-ibm text-xs tracking-widest uppercase text-steel">Продукция</span>
          </div>
          <h1 className="font-oswald text-4xl font-medium text-navy">Каталог продукции</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-white border border-border p-5 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div>
              <div className="font-ibm text-xs tracking-widest uppercase text-steel mb-2">Категория</div>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(categoryLabels) as CatalogCategory[]).map((key) => (
                  <button key={key} onClick={() => setCategoryFilter(key)} className={`filter-btn ${categoryFilter === key ? "active" : ""}`}>{categoryLabels[key]}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="font-ibm text-xs tracking-widest uppercase text-steel mb-2">Материал</div>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(materialLabels) as MaterialFilter[]).map((key) => (
                  <button key={key} onClick={() => setMaterialFilter(key)} className={`filter-btn ${materialFilter === key ? "active" : ""}`}>{materialLabels[key]}</button>
                ))}
              </div>
            </div>
            <div>
              <div className="font-ibm text-xs tracking-widest uppercase text-steel mb-2">ГОСТ / ТУ</div>
              <div className="flex flex-wrap gap-2">
                {(Object.keys(gostLabels) as GostFilter[]).map((key) => (
                  <button key={key} onClick={() => setGostFilter(key)} className={`filter-btn ${gostFilter === key ? "active" : ""}`}>{gostLabels[key]}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-border flex justify-between items-center">
            <span className="font-ibm text-xs text-steel">Найдено: <strong className="text-navy">{filteredItems.length}</strong> позиций</span>
            <button
              onClick={() => { setCategoryFilter("all"); setMaterialFilter("all"); setGostFilter("all"); }}
              className="font-ibm text-xs text-blue-brand hover:underline flex items-center gap-1"
            >
              <Icon name="RotateCcw" size={12} />Сбросить фильтры
            </button>
          </div>
        </div>

        {filteredItems.length === 0 ? (
          <div className="text-center py-20 text-steel">
            <Icon name="SearchX" size={40} className="mx-auto mb-3 text-slate-300" />
            <p className="font-ibm text-sm">По выбранным фильтрам ничего не найдено</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredItems.map((item) => (
              <div key={item.id} className="catalog-card bg-white border border-border p-5 group">
                <div className="flex items-start justify-between mb-3">
                  <span className="font-ibm text-[10px] uppercase tracking-widest text-white bg-blue-brand px-2 py-0.5">{categoryLabels[item.category]}</span>
                  <span className="font-ibm text-[10px] text-steel border border-border px-2 py-0.5">{item.gostLabel}</span>
                </div>
                <h3 className="font-oswald text-lg font-medium text-navy mb-2 group-hover:text-blue-brand transition-colors">{item.name}</h3>
                <p className="font-ibm text-xs text-steel leading-relaxed mb-4">{item.desc}</p>
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-secondary/60 px-3 py-2">
                    <div className="font-ibm text-[10px] uppercase tracking-wider text-steel">Ду</div>
                    <div className="font-ibm text-xs font-medium text-navy">{item.dn}</div>
                  </div>
                  <div className="bg-secondary/60 px-3 py-2">
                    <div className="font-ibm text-[10px] uppercase tracking-wider text-steel">Давление</div>
                    <div className="font-ibm text-xs font-medium text-navy">{item.pressure}</div>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-ibm text-[10px] text-steel uppercase tracking-wider">{materialLabels[item.material]}</span>
                  <button onClick={() => onNavigate("contacts")} className="font-ibm text-xs text-blue-brand flex items-center gap-1 hover:gap-2 transition-all uppercase tracking-wider">
                    Запросить цену<Icon name="ArrowRight" size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-12 border border-border bg-secondary/30 p-8 text-center">
          <p className="font-ibm text-sm text-steel mb-4">Не нашли нужную позицию? Изготовим по вашим чертежам или подберём аналог.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <button onClick={() => onNavigate("custom")} className="inline-flex items-center justify-center gap-2 bg-blue-brand text-white font-oswald text-sm font-medium px-6 py-3 hover:bg-[hsl(214,75%,22%)] transition-colors uppercase tracking-wider">
              Изготовление по чертежам
            </button>
            <button onClick={() => onNavigate("contacts")} className="inline-flex items-center justify-center gap-2 border border-navy text-navy font-oswald text-sm font-medium px-6 py-3 hover:bg-navy hover:text-white transition-colors uppercase tracking-wider">
              Связаться с менеджером
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}

/* ── CONTACTS ── */
function ContactsSection() {
  return (
    <main>
      <div className="bg-secondary/40 border-b border-border py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-3 mb-2">
            <span className="rule-line"></span>
            <span className="font-ibm text-xs tracking-widest uppercase text-steel">Контакты</span>
          </div>
          <h1 className="font-oswald text-4xl font-medium text-navy">Связаться с нами</h1>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div>
            <h2 className="font-oswald text-2xl font-medium text-navy mb-6">Реквизиты и адреса</h2>
            <div className="flex flex-col gap-5 mb-8">
              {[
                { icon: "Phone", label: "Телефон", value: "+7 (495) 000-00-00" },
                { icon: "Phone", label: "Отдел продаж", value: "+7 (495) 000-00-01" },
                { icon: "Mail", label: "Общий e-mail", value: "info@promtehkomplekt.ru" },
                { icon: "Mail", label: "Технический отдел", value: "tech@promtehkomplekt.ru" },
                { icon: "MapPin", label: "Офис и склад", value: "г. Москва, ул. Промышленная, д. 1, стр. 2" },
                { icon: "Clock", label: "Режим работы", value: "Пн–Пт: 09:00–18:00 (МСК)" },
              ].map((c) => (
                <div key={c.label} className="flex gap-4">
                  <div className="w-8 h-8 bg-blue-brand/10 flex items-center justify-center flex-shrink-0">
                    <Icon name={c.icon} size={14} className="text-blue-brand" />
                  </div>
                  <div>
                    <div className="font-ibm text-[10px] uppercase tracking-widest text-steel mb-0.5">{c.label}</div>
                    <div className="font-ibm text-sm font-medium text-navy">{c.value}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-secondary/60 border border-border p-5">
              <h3 className="font-oswald text-base font-medium text-navy mb-3">Реквизиты</h3>
              <div className="flex flex-col gap-2 font-ibm text-sm text-steel">
                {[["ИНН", "7700000000"], ["КПП", "770000000"], ["ОГРН", "1050000000000"], ["Р/с", "40702810000000000000"], ["Банк", "ПАО Сбербанк"]].map(([label, val]) => (
                  <div key={label} className="flex justify-between">
                    <span>{label}</span>
                    <span className="text-navy font-medium">{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h2 className="font-oswald text-2xl font-medium text-navy mb-6">Отправить запрос</h2>
            <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="font-ibm text-xs uppercase tracking-widest text-steel mb-1.5 block">Имя *</label>
                  <input type="text" placeholder="Иван Иванов" className="w-full border border-border px-3 py-2.5 font-ibm text-sm text-navy placeholder:text-slate-300 focus:outline-none focus:border-blue-brand transition-colors" />
                </div>
                <div>
                  <label className="font-ibm text-xs uppercase tracking-widest text-steel mb-1.5 block">Компания</label>
                  <input type="text" placeholder="ООО «Компания»" className="w-full border border-border px-3 py-2.5 font-ibm text-sm text-navy placeholder:text-slate-300 focus:outline-none focus:border-blue-brand transition-colors" />
                </div>
              </div>
              <div>
                <label className="font-ibm text-xs uppercase tracking-widest text-steel mb-1.5 block">Телефон *</label>
                <input type="tel" placeholder="+7 (___) ___-__-__" className="w-full border border-border px-3 py-2.5 font-ibm text-sm text-navy placeholder:text-slate-300 focus:outline-none focus:border-blue-brand transition-colors" />
              </div>
              <div>
                <label className="font-ibm text-xs uppercase tracking-widest text-steel mb-1.5 block">E-mail</label>
                <input type="email" placeholder="mail@company.ru" className="w-full border border-border px-3 py-2.5 font-ibm text-sm text-navy placeholder:text-slate-300 focus:outline-none focus:border-blue-brand transition-colors" />
              </div>
              <div>
                <label className="font-ibm text-xs uppercase tracking-widest text-steel mb-1.5 block">Сообщение / Запрос</label>
                <textarea rows={5} placeholder="Опишите нужную продукцию, количество, сроки..." className="w-full border border-border px-3 py-2.5 font-ibm text-sm text-navy placeholder:text-slate-300 focus:outline-none focus:border-blue-brand transition-colors resize-none" />
              </div>
              <div>
                <label className="font-ibm text-xs uppercase tracking-widest text-steel mb-1.5 block">Прикрепить чертёж / файл</label>
                <div className="border border-dashed border-border px-4 py-5 text-center cursor-pointer hover:border-blue-brand transition-colors">
                  <Icon name="Upload" size={18} className="mx-auto text-slate-300 mb-2" />
                  <p className="font-ibm text-xs text-steel">PDF, DWG, DXF, STEP до 20 МБ</p>
                </div>
              </div>
              <button type="submit" className="w-full bg-blue-brand text-white font-oswald text-sm font-medium py-3 hover:bg-[hsl(214,75%,22%)] transition-colors uppercase tracking-wider flex items-center justify-center gap-2">
                <Icon name="Send" size={16} />Отправить запрос
              </button>
              <p className="font-ibm text-xs text-steel text-center">
                Нажимая кнопку, вы соглашаетесь с{" "}
                <span className="text-blue-brand cursor-pointer hover:underline">политикой конфиденциальности</span>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}