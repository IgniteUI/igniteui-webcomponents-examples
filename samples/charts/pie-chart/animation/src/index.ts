import { IgcPieChartModule } from 'igniteui-webcomponents-charts';
import { IgcPieChartComponent } from 'igniteui-webcomponents-charts';
import { ModuleManager } from 'igniteui-webcomponents-core';

ModuleManager.register(IgcPieChartModule);

export class PieChartAnimation {

    private chart: IgcPieChartComponent;
    private interval: number = -1;
    public isAnimating: boolean = false;

    constructor() {
        this.onAnimationToggle = this.onAnimationToggle.bind(this);
        this.onAnimationClear = this.onAnimationClear.bind(this);

        this.chart = document.getElementById('chart') as IgcPieChartComponent;
        this.chart.dataSource = [
            { MarketShare: 37, Category: "Cooling" },
            { MarketShare: 25, Category: "Residential" },
            { MarketShare: 12, Category: "Heating" },
            { MarketShare: 11, Category: "Lighting" },
            { MarketShare: 15, Category: "Other" }
        ];
        this.onChartInit();

        let Animatebutton = document.getElementById('animateButton') as HTMLInputElement;
        Animatebutton!.addEventListener('click', this.onAnimationToggle);
    }

    public componentWillUnmount() {
        this.onAnimationClear();
    }

    public onAnimationToggle = () => {
        if (!this.isAnimating) {
            this.chart.startAngle = 0;
            this.chart.radiusFactor = 0.1;
            this.isAnimating = true;
            this.interval = window.setInterval(() => this.tick(), 15);
        } else {
            this.isAnimating = false;
            this.onAnimationClear();
        }
    }

    public onAnimationClear(): void {
        if (this.interval >= 0) {
            window.clearInterval(this.interval);
            this.interval = -1;
        }
    }

    public onChartInit(): void {
        this.onAnimationClear();
        this.onAnimationToggle();
    }

    public tick(): void {
        if (this.isAnimating) {
            if (this.chart.radiusFactor < 1.0)
                this.chart.radiusFactor += 0.0025;

            if (this.chart.startAngle < 360)
                this.chart.startAngle++;

            if (this.chart.radiusFactor >= 1.0 &&
                this.chart.startAngle >= 360) {
                this.isAnimating = false;
                this.onAnimationClear();
            }
        }
    }
}

new PieChartAnimation();
